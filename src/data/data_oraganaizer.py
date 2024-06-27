import json
import random

# numbers list
eval_numbers_list = range(6)
offer_numbers_list = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
offer_numbers_list.extend(range(10, 71, 10))

print(random.choice(offer_numbers_list))

with open('src\data\products.json', 'r') as file:
  productsJSON = json.load(file)

new_products_json = []
for product in productsJSON :
    # Edit srcs
    # new_products_srcs = product['srcs'].split()
    # new_products_srcs.append(product['srcs'])
    # product['srcs'] = " ".join(new_products_srcs)

    # Edit offer
    # product['offer'] = random.choice(offer_numbers_list)

    # Edit evalauation
    # product['evaluation'] = random.choice(eval_numbers_list)
    # product['evaluationCount'] = random.choice(range(10, 1000))

    # Edit quantity
    # product['quantity'] = random.choice(range(1, 100))

    # Edit trademarks

    
    new_products_json.append(product)


filtered_data = [item for item in productsJSON if item['id'] != "double dare"]
      
# print(filtered_data)

with open('src\data\products.json', 'w') as file:
   json.dump(new_products_json, file)