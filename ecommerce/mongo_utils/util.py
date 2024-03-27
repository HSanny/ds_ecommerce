def clean_product_name(name):
    if "(" in name:
        return name.split("(")[0].strip()
    return name