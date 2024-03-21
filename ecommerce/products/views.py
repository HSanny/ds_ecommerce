
import json
# Create your views here.

# This view function is responsible for handling requests to /products/amazon_products/. 
# It uses get_db_handle from mongo.py to get a connection to your MongoDB. 
# Then it accesses the amazon_products collection from the database and uses find({}) to retrieve all documents in the collection.
# The list comprehension transforms the MongoDB documents (excluding the MongoDB-specific _id field) into a list of dictionaries 
# which are then returned as a JSON response via JsonResponse.

from django.http import JsonResponse
from django.core.paginator import Paginator
from utils.mongo import get_db_handle

from collections import defaultdict
from django.views.decorators.csrf import ensure_csrf_cookie

@ensure_csrf_cookie
def amazon_products_list(request):
    db_handle, _ = get_db_handle()
    # use the collection name as per your MongoDB setup
    collection = db_handle.amazon_products 
    # documents = collection.find({})

    # build query based on filter parameters
#         example query for reference
#         {
#           "main_category": "Electronics",
#           "actual_price": {
#           "$gte": 100,
#           "$lte": 500
#         },
#         "rating": "4"
# }
    if request.method == 'POST':
        data = json.loads(request.body)
        filters = data.get('filters', {})
        query = defaultdict(lambda:None)

        filter_params = [
            'search',
            'main_category', 'sub_category',
            'actual_price_gte', 'actual_price_lte',
            'discount_price_gte', 'discount_price_lte', 
            'rating'
        ]

        for param in filter_params:
            # build query object
                # request.GET.get(key) instead of request.GET[key],
                # The .get() method returns None if the key doesn't exist, 
                # which prevents the MultiValueDictKeyError. 
                
            value = filters.get(param)
                # check ensures that only keys with non-null values are added to the query.
            if value:
                if 'gte' in param or 'lte' in param:
                # Handle range filters (e.g., price and rating ranges by splitting key to find field & operators
                    # only split on the last occurrence of the separator '_',
                    field, operator = param.rsplit('_', 1)
                    if not field in query:
                        query[field] = {} 

                        # Add the operator ($gte, $lte) and value to the query for the field
                    query[field]['$' + operator] = float(value) if 'price' in field else int(value)
                else:
                    # Handle exact match filters (e.g., category)
                    query[param] = value

        # Convert defaultdict back to a regular dict for MongoDB query
        query = dict(query)
        # apply query
        documents = collection.find(query)
        # since the data set is very large, use pagination to return fixed amount of data per request
        page_number = data.get('page', 1)

        try:
            page_number = int(page_number)
        except:
            page_number = 1
        
        paginator = Paginator(list(documents), 10)
        total_pages = paginator.num_pages
        page_obj = paginator.get_page(page_number)

        # convert MongoDB documents to a list of dictionaries
        # using a list comprehension to create a list of products 
        # without including the MongoDB generated _id field.
        # product_list = [
        #     {item: data[item] for item in data if item != '_id'} for data in documents
        # ]

        product_list = [
            {key: value for key, value in doc.items() if key != "_id"} for doc in page_obj
        ]

        response_data = {
            'products': product_list,
            'total_pages': total_pages,
        }

    # sending back a list of products
        return JsonResponse(response_data)

    else:
        # handle non-POST request here
        return JsonResponse({'error': 'This endpoint only supports POST request'})
    

from django.middleware.csrf import get_token
from django.http import JsonResponse

def csrf_token(request):
    return JsonResponse({'csrfToken': get_token(request)})


def get_data_summary(request):
    db_handle, _ = get_db_handle()
    # use the collection name as per your MongoDB setup
    collection = db_handle.amazon_products 

    # aggregate data using MongoDB's aggregation framework
    pipeline = [
        {
        '$addFields': {
            'discount_price_clean': {
                # check if string is empty string
                '$cond': {
                    'if': {'$eq': ['$discount_price', '']},
                    'then': None,
                    'else': {
                        '$toDouble': {
                            '$replaceAll': {
                                'input': {'$replaceAll': {'input': '$discount_price', 'find': '₹', 'replacement': ''}},
                                'find': ',',
                                'replacement': ''
                            }
                        }
                    }
                }
            },
            'actual_price_clean': {
                # check if string is empty string
                '$cond': {
                    'if': {'$eq': ['$discount_price', '']},
                    'then': None,
                    'else': {
                        '$toDouble': {
                            '$replaceAll': {
                                'input': {'$replaceAll': {'input': '$actual_price', 'find': '₹', 'replacement': ''}},
                                'find': ',',
                                'replacement': ''
                            }
                        }
                    }
                }
            },
        }
    },
        {
            '$group': {
                '_id': None, # used to aggregate all documents tgt w/o grouping them by distinct field
                'main_categories': {'$addToSet': '$main_category'}, # addToSet: construct array of unique values
                'sub_categories': {'$addToSet': '$sub_category'},
                'all_ratings': {'$addToSet': '$ratings'},
                'max_discount_price': {'$max': '$discount_price_clean'},
                'min_discount_price': {'$min': '$discount_price_clean'},
                'max_actual_price': {'$max': '$actual_price_clean'},
                'min_actual_price': {'$min': '$actual_price_clean'},
            }
        }
    ]

    # 
    summary = collection.aggregate(pipeline)
    summary_list = list(summary)

    return JsonResponse(summary_list, safe=False)