// This code adds a smooth scroll effect to the website.

$(document).ready(function() {
  $('a[href*="#"]').on('click', function(e) {
    e.preventDefault();

    var target = $(this.hash);

    if (target.length) {
      $('html, body').animate({
        scrollTop: target.offset().top
      }, 500);
    }
  });
});

// This code validates the feedback form.

$('.feedback-form').submit(function() {
  var name = $('input[name="name"]').val();
  var email = $('input[name="email"]').val();
  var message = $('textarea[name="message"]').val();

  if (name == '') {
    alert('Please enter your name.');
    return false;
  }

  if (email == '') {
    alert('Please enter your email address.');
    return false;
  }

  if (message == '') {
    alert('Please enter your message.');
    return false;
  }

  // Send the feedback to the server.

  $.ajax({
    url: '/feedback',
    type: 'POST',
    data: {
      name: name,
      email: email,
      message: message
    },
    success: function(response) {
      if (response.success) {
        alert('Your feedback has been sent.');
      } else {
        alert('There was an error sending your feedback. Please try again later.');
      }
    }
  });

  return false;
});
