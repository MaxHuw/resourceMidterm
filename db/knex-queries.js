require('dotenv').config({ path: '../.env' });

const settings = require('../knexfile.js')['development'];

const knex = require('knex')(settings);

function findAllResources(cb) {

  knex('resources')
    .select('*')
    .then(rows => {
      cb(rows);
    })
    .catch(err => console.log('findAllResources', err.message));
}

//Test
//findAllResources(function(input){console.log("All resources: ");console.log(input);});


/*******************************
Description: Searches resource table and returns
resources with matching topic_id
Input: A topic ID and a callbackfunction.
Output:
*******************************/
function findResourceByTopicId(topicId, cb) {

  knex('resources')
    .select('*')
    .where('topic_id', topicId)
    .then(rows => {
      cb(rows);
    })
    .catch(err => console.log('findResourceByTopicId', err.message));
}

//Test
// findResourceByTopicId(1, function(input){console.log("Testing finding resource by topic id:");console.log(input);});

/*******************************
Description: Searches resource table and returns
resources with matching id
Input: A resource ID and a callbackfunction.
Output:
*******************************/

function findResourceByResourceId(resourceId, cb) {

  knex('resources')
    .select('*')
    .where('id', resourceId)
    .then(rows => {
      cb(rows);
    })
    .catch(err => console.log('find resource 2', err.message));
}


//Test
//(2, function(input){console.log("Testing finding resource by resource id:");console.log(input);});

/*******************************
Description: Searches resource table and returns
resources with matching user_id
Input: A user ID and a callbackfunction.
Output:
*******************************/

function findResourceByUserId(userId, cb) {

  knex('resources')
    .select('*')
    .where('user_id', userId)
    .then(rows => {
      cb(rows);
    })
    .catch(err => console.log(err.message));
}

//Test
//findResourceByUserId(3, function(input){console.log("Testing finding resource bu user id:");console.log(input);});


/*******************************
Description: Searches resource table and returns
all resources liked by the user.
Input: A user ID and a callbackfunction.
Output:
*******************************/

function findResourceByUserLikes(userId, cb) {

  knex('resources')
    .join('likes', 'resources.id', '=', 'likes.resource_id')
    .select('*')
    .where('likes.user_id', userId)
    .then(rows => {
      cb(rows);
    })
    .catch(err => console.log(err.message));
}

//Test
//findResourceByUserLikes(1, function(input){console.log("Testing finding resources by user likes:");console.log(input);});

/*******************************

Description: Searches resource by search tems
in the resource title
Input: A searchTerm
Output:
*******************************/
function searchResources(searchTerm, cb) {

  console.log(searchTerm);
  knex('resources')
    .select('*')
    .whereRaw('title ILIKE ?', ['%' + searchTerm + '%'])
    .then(rows => {
      cb(rows);
    })
    .catch(err => console.log('searchResources', err.message));
}

//Test
//searchResources('octopuses', function(input){console.log("Testing search resource by searchTerm: ");console.log(input);});

/*******************************

Description: Searches User
Input: A user ID and a callbackfunction.
Output:
*******************************/

function findCommentByResourceId(resourceId, cb) {

  knex('comments')
    .select('*')
    .where('resource_id', resourceId)
    .then(rows => {
      cb(rows);
    })
    .catch(err => console.log("error: ", err.message));
}

//Test
//findCommentByResourceId(1, function(input){console.log("Testing finding comment by resourceId:");console.log(input);});


/*******************************
Description: Searches User
Input: A user ID and a callbackfunction.
Output:
*******************************/

function findUserById(userId, cb) {

  knex('users')
    .select('*')
    .where('id', userId)
    .then(rows => {
      cb(rows);
    })
    .catch(err => console.log(err.message));
}

/*******************************
Description: Finds a user by name
Input: A user name and a callbackfunction.
Output:
*******************************/

function findUserByName(userName, cb) {

  knex('users')
    .select('*')
    .where('id', userName)
    .then(rows => {
      cb(rows);
    })
    .catch(err => console.log(err.message));
}

/*******************************
Description: Change information of user.
Input: User data.
Output:
*******************************/

function updateUserInfo(userId, userInfo, cb) {

  knex('users')
    .where('id', userId)
    .update({ name: userInfo.name })
    .then(cb)
    .catch(err => console.log(err.message));
}
//Test
// console.log("Updating user info");
// updateUserInfo(5, {name: 'Max2'});

/*******************************
Description: Adds a like to the  likes table.
Input: A user ID and resource ID.
Output:
*******************************/

function likeResource(userId, resourceId) {

  knex('likes')
    .insert({
      user_id: userId,
      resource_id: resourceId
    })
    .returning('*')
    .catch(err => console.log(err.message))
    .then(function () {
      console.log("Testing adding a like.");
    });
};

//Test
//likeResource(1, 3);

/*******************************
Description: Adds a rating for a resource.
Input: A rating, user ID resource ID.
Output:
*******************************/

function rateResource(userId, resourceId, rating) {

  knex('ratings')
    .insert({
      rating: rating,
      user_id: userId,
      resource_id: resourceId
    })
    .returning('*')
    .catch(err => console.log(err.message))
    .then(function () {
      console.log("Testing adding a rating.");
    });
};

//Test
//rateResource(1, 2, 5);

/*******************************
Description: Total rating for a resource.
Input: A resource Id and a callback function
Output:
*******************************/

function averageRating(resourceId, cb) {

  knex('ratings')
  .where('resource_id', resourceId)
  .avg('rating')
  .then(results => {
      cb(results);
  });

};


//Test
// console.log("Average rating for a resource.");
// averageRating(2, (results) => {console.log(results)});

/*******************************
Description: Adds a new resource to the resource table.
Input: An input object with all the new resource data.
Output: Adds new resource to the recource table.
*******************************/

function newResource(input) {

  knex('resources')
    .insert({
      url: input.url,
      title: input.title,
      description: input.description,
      user_id: input.user_id,
      topic_id: input.topic_id,
      date_posted: input.date_posted,
      img_url: input.img_url
    })
    .returning('*')
    .catch(err => console.log(err.message))
    .then(function () {console.log("Added a new resource.")});
};

//Test
//console.log("Testing adding a new resource.");
// newResource({url: 'https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/routes',
//              title: 'Testing new resource 2',
//              description: 'A tutorial for using route controlers.',
//              user_id: 1,
//              topic_id: 2,
//              date_posted: '3 Feb 2019',
//              img_url: 'https://mdn.mozillademos.org/files/14456/MVC%20Express.png'});

/*******************************
Description:Adds a comment to the comments table
Input: An input object with all the new comment data.
Output:
*******************************/

function newComment(input) {

  knex('comments')
    .insert({
      resource_id: input.resourceId,
      user_id: input.userId,
      comment: input.comment
    })
    .returning('*')
    .catch(err => console.log(err.message))
    .then(function () { console.log("Testing adding a new comment"); });
};




/*******************************
Description: Deletes a resource to the resource table.
Input: An input object with all the new resource data.
Output: Adds new resource to the recource table.
*******************************/

function deleteResource(resourceId) {

  knex('resources')
    .where('id', resourceId)
    .del()
    .catch(err => console.log(err.message))
    .then(function () {
      console.log("Testing deleting a resource.");
    });
};

//Test
//deleteResource(4);


/*******************************
Description: Delete Like
Input: A like's id
Output:
*******************************/

function deleteLike(likeIf) {

  knex('likes')
    .where('id', likeId)
    .del()
    .catch(err => console.log(err.message))
    .then(function () {
      console.log("Testing deleting a like.");
    });
};

//Test
//deleteResource(4);

/*******************************
Description: Adds a new user to the user table.
Input: An input object with all the new user data.
Output: Adds new user to the users table.
*******************************/

function newUser(input) {

  knex('users')
    .insert({ name: input }) 
    .returning('*')
    .catch(err => console.log(err.message))
    .then();

};

//Test
// console.log("Testing adding a new user.");
// newUser({name: 'Hughes', email: 'hughes@something.com', occupation: 'Cattle Wrangler'});


module.exports = {

  findAllResources,
  findResourceByTopicId,
  findResourceByResourceId,
  findResourceByUserId,
  findResourceByUserLikes,
  findUserById,
  findUserByName,
  findCommentByResourceId,
  updateUserInfo,
  newComment,
  updateUserInfo,
  likeResource,
  rateResource,
  averageRating,
  newResource,
  deleteResource,
  newUser,
  searchResources

};
