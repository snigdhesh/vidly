// POST  /api/returns  {customerId, movieId}

//Return 401 if client is not logged in
//Return 400 if customerId is not provided
//Return 400 if movieId is not provided
//Return 404 if rental not found
//Return 400 if rental is already processed
//Set the return date
//Calculate rental free
//Increase the stock
//Return the rental