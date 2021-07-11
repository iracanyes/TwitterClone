# Twitter Clone - Exercise Savim Vadim

Live coding : https://youtu.be/Fdi6FRCT1uY

Source code: https://github.com/Savinvadim1312/TwitterClone

####AWS Amplify Expired API Key error:

1. Delete the existing API Key by setting ``CreateAPIKey: 0`` in the file ``amplify/backend/api/<app-name>/parameters.json``

2. Create a new API Key by setting ``CreateAPIKey: 1`` in the file ``amplify/backend/api/<app-name>/parameters.json``
