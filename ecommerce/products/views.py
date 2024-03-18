from django.shortcuts import render

# Create your views here.

# This view function is responsible for handling requests to /products/amazon_products/. 
# It uses get_db_handle from mongo.py to get a connection to your MongoDB. 
# Then it accesses the amazon_products collection from the database and uses find({}) to retrieve all documents in the collection.
# The list comprehension transforms the MongoDB documents (excluding the MongoDB-specific _id field) into a list of dictionaries 
# which are then returned as a JSON response via JsonResponse.

from django.http import JsonResponse
from django.core.paginator import Paginator
from utils.mongo import get_db_handle


def amazon_products_list(request):
    db_handle, _ = get_db_handle()
    # use the collection name as per your MongoDB setup
    collection = db_handle.amazon_products 
    documents = collection.find({})

    # since the data set is very large, use pagination to return fixed amount of data per request
    paginator = Paginator(list(documents), 10)
    page_number = request.GET.get('page', 1)
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

    # sending back a list of products
    return JsonResponse(product_list, safe=False)