import json
import random
import os

# numbers list
eval_numbers_list = range(1, 6)
offer_numbers_list = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
offer_numbers_list.extend(range(10, 71, 10))

with open('src\data\products.json', 'r') as file:
  productsJSON = json.load(file)

good_comments = ["Cool product!", "I'll buy another one soon", "I strongly recommend buying one"]
bad_comments = ["Bad taste", "Terrible!", "I strongly don't recommend buying it"]

# ==================

trademark = "te te"

trademarkPath = "te-te"

path_to_files = 'public/products_images/{}'.format(trademarkPath)
file_names = os.listdir(path_to_files)




def sort_by_number(filenames):
  def get_number(filename):
    parts = filename.split('-')
    if len(parts) > 1:
      try: return int(parts[-1].split('.')[0])
      except ValueError: pass
    return float('inf')

  return sorted(filenames, key=get_number)


sorted_filenames = sort_by_number(file_names.copy())
sorted_filenames.pop()
print(sorted_filenames)

'''
new products
  * category
  - src
  * title
  - summary
  - price
  * trademark
'''

product_details = "title1:content1|title2:content2|title3:content3"
new_products_to_add_global = {"category": "", "title": "Te Te", "trademark": trademark}

products_ids = []
for product in productsJSON :
    products_ids.append(product['id'].split("-")[1])

biggest_id = int(products_ids[-1])

new_products_to_add = []

num = 1

# for image in sorted_filenames :
#     product_src = "https://raw.githubusercontent.com/Maktoom0/Breezybasket/main/public/products_images/{}/{}".format(trademark, image)
#     print(product_src)

for image in sorted_filenames:
    product_src = "https://raw.githubusercontent.com/Maktoom0/Breezybasket/main/public/products_images/{}/{}".format(trademarkPath, image)
    print(product_src)
    product_category = input("Enter the category: ")
    if product_category == "e": break
    product_summary = input("product summary: ")
    product_price = int(input("product price: "))

    print("=====================")
    
	# product src
    product_src_list = []
    for i in range(4) : product_src_list.append(product_src)
    
	# Comments
    product_eval = random.choice(eval_numbers_list)
    product_eval_count = random.choice(range(5, 20))
    comments = []

    for i in range(product_eval_count):
       if product_eval >= 3: comments.append(random.choice(good_comments))
       else : comments.append(random.choice(bad_comments))
       
    
    new_products_to_add.append({
       "id": "{}-{}".format(product_category, biggest_id + num), 
       "srcs": " ".join(product_src_list), "title": new_products_to_add_global["title"], 
       "summary": product_summary,
       "price": product_price,
       "offer": random.choice(offer_numbers_list),
       "evaluation": product_eval,
       "evaluationCount": product_eval_count,
       "trademark": new_products_to_add_global["trademark"],
       "details": product_details,
       "quantity": random.choice(range(1, 100)),
       "comments": "|||".join(comments)})
    
    num += 1



new_products_json = productsJSON + new_products_to_add
# for product in productsJSON :
    # Edit srcs
   #  if int(product['id'].split("-")[1]) > 14:
   #     new_products_srcs = []
   #     src = input("enter the src: ")
   #     for i in range(4): new_products_srcs.append(src)
	   
   #     product['srcs'] = " ".join(new_products_srcs)

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

    
   #  new_products_json.append(product)
    # print(product['id'])


# filtered_data = [item for item in productsJSON if item['id'] != "double dare"]
      
# print(filtered_data)

# remove comment when ready to use
with open('src\data\products.json', 'w') as file:
   json.dump(new_products_json, file)