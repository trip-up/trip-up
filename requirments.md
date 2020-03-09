# Software Requirements
### Team .connect(four)

https://codefellows.github.io/common_curriculum/projects/SoftwareReqs

## Vision 
**Trip Up** is a travel app to connect with other like minded travelers to plan, and organize trips.  It enables collaboration and brings people together.

## Scope (In/Out) 
* The app will allow users to create new trips that other users can sign up for.
* It allows users to look for available trips and sign up for them
* The trip organizer will be able to create itineraries and packing lists for their trip members to view
* The app will allow users within a trip to communicate with each other via email and/or chat

* This app will never require paid membership
* It won’t do one day events.  The focus is intended for multi-day travel planning.

## MVP 
* Users can create new trips
* Users can sign-up for trips that are listed
* Trip organizers can create packing lists and itineraries


## Stretch 
* Direct message to coordinator
* Group chat for trip
* Group chat between specific members
* Upon sign-up to a trip, an email is triggered to send to the new trip member
* Expired trips database
Filter trips by available dates

## Functional Requirements 
* Admin can create and delete user accounts and trips
* Trip organizers can delete the trip they created, itineraries and packing lists
* Trip organizers can create and update packing lists and itineraries
* Users can view all trips that are available
* Users can sign up for a trip and see information about trips they signed up for

    ### Data Flow
    * Once a user has signed up or signed in, they have the ability to see a list of all available trips to join.
    * Once a user has joined a trip they can view the packing list, itinerary, and a list of all other members of the trip.
    * The user will also have the option to create their own trip.  Upon creating a trip they can add an itinerary and packing list.  They also have the option to delete any of the aforementioned things they created.

## Non-Functional Requirements 
* **Testability** - Implement tests that check that proper routes are being hit and that users are able to create, read, update and delete based on their permissions attached to their roles. This will assist in debugging, testing edge cases, and that usability meets guidelines set for user role status
    * Routes 
    * CRUD Functions
    * Authorization and Authentication 
* **Security** - implement authorization methods in order to limit what users can do based on role permission settings. By limiting certain features to certain users this will help keep trips up to date with accurate information and allow for security against unauthorized changes. 
