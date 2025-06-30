@app.route("/api/menu/<store>", methods=["GET"])
def get_menu(store):
    categorized_menus = {
        "Walmart": {
            "Food": [
                {"name": "Frozen Pizza", "price": 5.99, "imageUrl": "https://via.placeholder.com/150?text=Frozen+Pizza"},
                {"name": "Rotisserie Chicken", "price": 6.49, "imageUrl": "https://via.placeholder.com/150?text=Rotisserie+Chicken"}
            ],
            "Appliances": [
                {"name": "Toaster", "price": 24.99, "imageUrl": "https://via.placeholder.com/150?text=Toaster"},
                {"name": "Microwave", "price": 89.99, "imageUrl": "https://via.placeholder.com/150?text=Microwave"}
            ],
            "Drinks": [
                {"name": "Coca Cola (12-pack)", "price": 5.49, "imageUrl": "https://via.placeholder.com/150?text=Coke+12-pack"}
            ]
        },
        "Popeyes": {
            "Food": [
                {"name": "Spicy Chicken Sandwich", "price": 4.99, "imageUrl": "https://via.placeholder.com/150?text=Chicken+Sandwich"},
                {"name": "Cajun Fries", "price": 2.99, "imageUrl": "https://via.placeholder.com/150?text=Cajun+Fries"}
            ],
            "Drinks": [
                {"name": "Sweet Tea", "price": 1.99, "imageUrl": "https://via.placeholder.com/150?text=Sweet+Tea"}
            ]
        },
        "McDonald's": {
            "Food": [
                {"name": "Big Mac", "price": 5.49, "imageUrl": "https://via.placeholder.com/150?text=Big+Mac"},
                {"name": "Fries", "price": 1.99, "imageUrl": "https://via.placeholder.com/150?text=Fries"}
            ],
            "Drinks": [
                {"name": "Coca Cola", "price": 1.49, "imageUrl": "https://via.placeholder.com/150?text=Coke"}
            ]
        }
        # Add more stores here...
    }

    return jsonify({
        "store": store,
        "categories": categorized_menus.get(store, {})
    })
