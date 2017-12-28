This project was bootstrapped with [Create React Native App](https://github.com/react-community/create-react-native-app).

# Show your friends where and when you will be, to make planning group meetings easy!

## Testing notes
- I have run through most of the functionality in .gifs that can be viewed below
- Firebase database access has been granted to tim@cs.dartmouth.edu for further vetting

## Functionality

#### Firebase Authentication

Sign in and sign out using your group name and group password to access your markers!  If your information is not currently in the database, you will not be allowed in and be prompted to create an account.  

![Log-in and Sign-up!](https://media.giphy.com/media/l0HUkyeXg9qgrWHa8/giphy.gif)

#### AirBnb Maps API

Start off on a map of Dartmouth College/Hanover, provided by the AirBnb Maps API - includes local landmarks and businesses, as well as major building and roads.

#### Create markers

Create markers simply by pressing on a point in the map, stored in the backend of the Firebase database.  They are permanent even when you log-out and log back in.  They are initialized with a default description, which you must update later.

![Create a marker](https://media.giphy.com/media/3oFzmhgkPP4m4bBp8A/giphy.gif)

#### Update and delete markers

When markers are tapped, a call-out will appear displaying its information.  Tap on the call-out for a modal to pop up asking you for information that it will take in to update the respective marker.

![Update a marker](https://media.giphy.com/media/3o752nZloD1H82kynC/giphy.gif)

Or, you can choose to delete the marker.

![Delete a marker](https://media.giphy.com/media/3o752iW5R9FOJuqnWE/giphy.gif)

Both functionalities are supported with the Firebase database, and changes are enacted immediately.

## Known bugs

When markers are updated, the styling has some strange spacing at first - it goes back to normal when you 'refresh' AKA click outside and click on it again.  This seems to have to do with the AirBnb API since that's where the styling of the markers come from.

If you notice any, please leave an issue!

## Difficulties

Uhhh to be honest, a lot.

Integrating the AirBnb API was difficult since it has been a while since I had to read through API documentation, and since I was using several different libraries in this app, I had to make sure none of them collided in bad ways.  For example, it was really hard figuring out how to integrate the modal with AirBnb Maps.

Figuring out how to access the information of the marker was also very difficult, compounded by problems with keys and creating markers that took input information from two different sources (AirBnb API and the modal) which meant I either had to save things to state or consolidate.

[New] To fix the bug with the lack of syncing, I had to revamp the Marker component to include additional fields and figure out how exactly those related to the displays.  Just a lot of moving parts to keep track of.
