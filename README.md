# BackEndAfrMark

Endpoints :

[POST] /api/users/register
[POST] /api/users/login

[GET] /api/items/
[POST] /api/items/

[GET] /api/markets/
[GET] /api/markets/:market_id
[POST] /api/markets/

------------------------------------------------------------------------------------

Register User 
[POST] (/api/users/register) :
// body
{
  "username": "foo",
  "name": "foo Name",
  "password": "1234",
}
// response
{
    "user_id": 4,
    "username": "foo",
    "name": "foo Name",
    "password": "$2a$08$3/0/kbDWm/DoBKswjESwUeRjjrsmfSWSRdLbvIBoVC9Y8npsgTZE."
}

Login 
[POST] (/api/users/login) :
// body
{
  "username": "foo",
  "password": "1234"
}
// response 
{
    "message": "welcome, foo",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0Ijo2LCJ1c2VybmFtZSI6ImZvbyIsImlhdCI6MTYzMjE4MDc3NCwiZXhwIjoxNjMyMjY3MTc0fQ.jegFvlL8fE_VsLIVOvVo8B4Pf9DKJxkH6ByS7XyV0wA" 
}


Get Items 
[GET] (/api/items/) :
// response
{
        "item_id": 1,
        "market_id": 1,
        "item_description": "Description would be here",
        "item_name": "Granny Smith",
        "item_price": 1.2
}

Add Items (must be logged in)
[POST] (/api/items/) :
// body
{
        "market_id": 1,
        "item_description": "Description would be here",
        "item_name": "Granny Smith",
        "item_price": 1.2
    }
// response
{
    "item_id": 11,
    "item_name": "Granny Smith",
    "item_description": "Description would be here",
    "item_price": 1.2,
    "market_id": 1
}


Get Markets
[GET] (/api/markets) :
// response
[
    {
        "market_id": 1,
        "market_name": "WholerFoods",
        "user_id": 1
    },
    {
        "market_id": 2,
        "market_name": "Not Walmart",
        "user_id": 2
    },
    {
        "market_id": 3,
        "market_name": "Not Amazon",
        "user_id": 3
    }
]

Get Markets by ID
[GET] (/api/markets/:market_id) / (/api/markets/3)
// response
{
    "market_id": 3,
    "market_name": "Not Amazon",
    "user_id": 3,
    "name": "Geoff Bezus",
    "items": [
        {
            "item_id": 3,
            "item_name": "Chicken Breast",
            "item_description": "Description would be here",
            "item_price": 3.5
        },
        {
            "item_id": 6,
            "item_name": "Ham",
            "item_description": "Description would be here",
            "item_price": 2.5
        },
        {
            "item_id": 7,
            "item_name": "Natures Own",
            "item_description": "Description would be here",
            "item_price": 3
        }
    ]
}

Create a Market (Must be logged in)
[POST] (/api/markets/)
// body
{
        "market_name": "FooSnackShack",
        "user_id": 4
    }
// response
{
    "market_id": 4,
    "market_name": "FooSnackShack",
    "user_id": 4
}