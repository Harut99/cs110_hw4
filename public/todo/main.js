use strict;

$('#searchbutton').on('click', function() {
alert('hi');
});

const searchtext = $('#searchtxtbx').val();
    $.ajax({
        url      : "/todos",
        type     : 'get',
        dataType : 'json',
        data     : {
            searchtext : searchtext
        },
        success  : function(data) {
            // render 'data' on the screen
        },
        error    : function(data) {
            alert('Error searching');
        }
    });
 const val = $('#msgtxtbx').val();
    $('#msgtxtbx').val(''); // clear the textbox

    $.ajax({
        url         : "/todos",
        type        : 'post',
        dataType    : 'json',
        data        : JSON.stringify({
            message   : val,
            completed : false
        }),
        contentType : "application/json; charset=utf-8",
        success     : function(data) {
            // refresh the list (re-run the search query)
        },
        error       : function(data) {
            alert('Error creating todo');
        }
    });