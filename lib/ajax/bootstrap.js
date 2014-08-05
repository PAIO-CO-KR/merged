$.ajax({
    type: "POST",
    url: "some.php",
    data: { name: "John", location: "Boston" }
}).done(function( msg ) {
    alert( "Data Saved: " + msg );
});