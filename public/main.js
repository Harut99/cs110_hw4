'use strict';


//  search button onclick event handler
$('#searchbutton').on('click', function() {
  drawlist();
});

$('#savebutton').on('click', function() {
    const val = $('#msgtxtbx').val();
    $('#msgtxtbx').val(''); // clear the textbox

    $.ajax({
        url         : "/todos",
        type        : 'POST',
        dataType    : 'json',
        data        : JSON.stringify({
            text   : val,
            complited : false
        }),
        contentType : "application/json; charset=utf-8",
        success     : function(data) {
            drawlist();
        },
        error       : function(data) {
            alert('Error creating todo');
        }
    });

});

// Drawing / refreshing TODO list with using search/filter string
const drawlist = function () {

    const searchtxt = $('#searchtxtbx').val(); // get search/filter string value
    $('#searchtxtbx').val('');
    $.ajax({
        url      : "/todo",
        type     : 'GET',
        dataType : 'json',
        data     : {
            searchtext : searchtxt
        },
        success  : function(todo) {
            const ftodo = todo;
            const tdlist = $('#todolist'); // get UL with id=todolist
            tdlist.html('');  // Clear all html (li, input) in tdlist (UL) tag
            ftodo.forEach(function(tditem) {
                const li = $('<li> ' + tditem.text + ' <input type="checkbox" id="cb'+tditem.id+'"><button id="bt'+tditem.id+'">Delete</button></li>'); // Create li and input tags for each todo item
                const cb = li.find('input'); // Get current input tag
                cb.prop('checked', tditem.complited); // Set checked properties for input tag
                cb.on('change', function(){  // Set onchange event handler for input tag
                    tditem.complited = cb.prop('checked');
                    $.ajax({
                        url         : "/todo/" + tditem.id,
                        type        : 'put',
                        dataType    : 'json',
                        data        : JSON.stringify(tditem),
                        contentType : "application/json; charset=utf-8",
                        success     : function(todo) {

                        },
                        error       : function(todo) {
                            alert('Error creating todo');
                        }
                    });


                });
                const btn = li.find('button'); //Get button
                btn.on('click', function(){
                    $.ajax({
                        url      : "/todo/"+tditem.id,
                        type     : 'delete',
                        success  : function () {
                            drawlist();
                        },
                        error    : function () {
                            alert('Error deleting todo');
                        }
                   });
                });
                tdlist.append(li); // Adding created il tag to ul
            })
        },
        error    : function(todo) {
            alert('Error searching');
        }
    });
};

drawlist();
