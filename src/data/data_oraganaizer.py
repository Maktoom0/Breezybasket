import json
import random

# numbers list
eval_numbers_list = range(1, 6)
offer_numbers_list = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
offer_numbers_list.extend(range(10, 71, 10))

print(random.choice(offer_numbers_list))

with open('src\data\products.json', 'r') as file:
  productsJSON = json.load(file)

good_comments = ["Cool product!", "I'll buy another one soon", "I strongly recommend buying one"]
bad_comments = ["Bad taste", "Terrible!", "I strongly don't recommend buying it"]

new_products_json = []
for product in productsJSON :
    # Edit srcs
    # new_products_srcs = product['srcs'].split()
    # new_products_srcs.append(product['srcs'])
    # product['srcs'] = " ".join(new_products_srcs)

    # Edit offer
    # product['offer'] = random.choice(offer_numbers_list)

    # Edit evalauation
    # if product['evaluation'] == 0 :
    #     product['evaluation'] = random.choice(eval_numbers_list)

    # product['evaluationCount'] = random.choice(range(5, 20))

    # Edit quantity
    # product['quantity'] = random.choice(range(1, 100))

    # Edit Comments
    # comments = []
    # for i in range(product['evaluationCount']) :
    #   if (product['evaluation'] >= 3): comments.append(random.choice(good_comments))
    #   else : comments.append(random.choice(bad_comments))

    # product['comments'] = "|||".join(comments)

    # Edit trademarks

    
    new_products_json.append(product)


filtered_data = [item for item in productsJSON if item['id'] != "double dare"]
      
# print(filtered_data)

with open('src\data\products.json', 'w') as file:
   json.dump(new_products_json, file)