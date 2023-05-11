// This code will make the header of your website sticky, so that it stays visible when you scroll down.

window.onscroll = function() {
  var header = document.getElementById("header");
  if (window.pageYOffset > 0) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
};

// This code will make the buttons on your website change color when you hover over them.

var buttons = document.querySelectorAll(".button");
for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("mouseover", function() {
    this.style.backgroundColor = "#0000cc";
  });
  buttons[i].addEventListener("mouseleave", function() {
    this.style.backgroundColor = "#000088";
  });
}

// This code will make the images on your website fade in when the page loads.

var images = document.querySelectorAll(".image");
for (var i = 0; i < images.length; i++) {
  images[i].addEventListener("load", function() {
    this.style.opacity = 1;
  });
}
// This code will fetch the latest posts from the band's social media accounts and display them in a feed on the website.

var socialMediaFeed = document.getElementById("social-media-feed");

// Get the band's social media accounts.

var twitterAccount = "twitter.com/bandname";
var facebookAccount = "facebook.com/bandname";
var instagramAccount = "instagram.com/bandname";

// Create a new object to store the social media posts.

var socialMediaPosts = {};

// Fetch the latest posts from Twitter.

$.get("https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=" + twitterAccount, function(data) {
  // Loop through the posts and add them to the social media posts object.
  for (var i = 0; i < data.length; i++) {
    socialMediaPosts[data[i].id] = data[i];
  }
});

// Fetch the latest posts from Facebook.

$.get("https://graph.facebook.com/" + facebookAccount + "/posts", function(data) {
  // Loop through the posts and add them to the social media posts object.
  for (var i = 0; i < data.length; i++) {
    socialMediaPosts[data[i].id] = data[i];
  }
});

// Fetch the latest posts from Instagram.

$.get("https://api.instagram.com/v1/users/" + instagramAccount + "/media/recent?count=10", function(data) {
  // Loop through the posts and add them to the social media posts object.
  for (var i = 0; i < data.length; i++) {
    socialMediaPosts[data[i].id] = data[i];
  }
});

// Sort the social media posts by date.

var sortedSocialMediaPosts = Object.keys(socialMediaPosts).sort(function(a, b) {
  return socialMediaPosts[b].created_at - socialMediaPosts[a].created_at;
});

// Loop through the social media posts and display them in the feed.

for (var i = 0; i < sortedSocialMediaPosts.length; i++) {
  var socialMediaPost = socialMediaPosts[sortedSocialMediaPosts[i]];
  var postType = socialMediaPost.type;
  var postContent = socialMediaPost.text;
  var postImage = socialMediaPost.image;

  // Create a new element to display the post.

  var postElement = document.createElement("div");
  postElement.className = "social-media-post";

  // Add the post type to the element.

  var postTypeElement = document.createElement("span");
  postTypeElement.className = "social-media-post-type";
  postTypeElement.textContent = postType;
  postElement.appendChild(postTypeElement);

  // Add the post content to the element.

  var postContentElement = document.createElement("p");
  postContentElement.textContent = postContent;
  postElement.appendChild(postContentElement);

  // Add the post image to the element.

  if (postImage) {
    var postImageElement = document.createElement("img");
    postImageElement.src = postImage;
    postElement.appendChild(postImageElement);
  }

  // Append the post element to the feed.

  socialMediaFeed.appendChild(postElement);
}
