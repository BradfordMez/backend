# BackEndAfrMark



EndPoints and what they return [
    Items [
        [Get] '/api/items'
            returns (
                [
                {
                    "item_id": 1,
                    "user_id": 1,
                    "market_name": "Healthy Place",
                    "item_type": "Fruit",
                    "item_subtype": "Apples",
                    "item_name": "Granny Smith",
                    "Quantity": 14,
                    "item_price": 1.2
                },
                {
                    "item_id": 2,
                    "user_id": 1,
                    "market_name": "Healthy Place",
                    "item_type": "Vegetables",
                    "item_subtype": "Tomatoes",
                    "item_name": "Cherry Tomatoes",
                    "Quantity": 25,
                    "item_price": 0.59
                },
                etc.
                ]
            )
        [Post] '/api/items'
    ]
]