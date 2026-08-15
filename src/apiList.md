# DevTinder API's

## authRouter
 - POST /signup
 - POST /login
 - POST /logout

 ## profileRouter
  - GET / profile/view
  - PATCH / profile/edit
  - PATCh /profile/password

  ## connectionRequestRouter
   - POST request/send/interested/:userID
   - POST request/send/ignored/:userID
   - POST request/review/accepted/:userID
   - POSt request/review/rejected/:userID

   ## userRouter
   - GET /user/connections
   - GET /user/request
   - GET /user/feed - gets the profile of other users on your feed

   status: intrested, ignored, accepted, rejected



