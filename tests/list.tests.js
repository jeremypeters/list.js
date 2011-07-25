module("List.js standard");
var theList
    , ryah = {
        id: 4
        , name: "Ryan Dahl"
        , feature: "Node"
    }
    , tj = {
        id: 5
        , name: "TJ Holowaychuk"
        , feature: "Node"
    }
    , jonny = {
        id: 6
        , name: "Jonny Strömberg"
        , feature: "List.js"
    };
test('Create List.js from existing list', function() {
    var templates = { 
        valueNames: ['id', 'name', 'feature']
    };
    theList = new List('list', templates);
    ok(true, "list created" );
});

test('Count items', function(){
   equals(theList.size(), 3);
});

test('Add one item', function(){
    theList.add(ryah);
    equals(theList.size(), 4);
});
test('Add two items', function(){
    theList.add([tj, jonny]);
    equals(theList.size(), 6);
});

test('Remove one item', function() {
    var found = theList.remove('id', 6);
    
    equals(found, true, "Item was note found");
    equals(theList.size(), 5, 'List is not one item shorter');
});

test('Try remove one item that not exists', function() {
    var found = theList.remove('id', 9);
    
    equals(found, false, 'An item was found');
    equals(theList.size(), 5, 'List are not 5 items long');
});

test('Get one item', function() {
    var item = theList.get('id', 4);
    deepEqual(item.getValues(), ryah); 
});

test('Get two items', function() {
    var items = theList.get('feature', 'Node');
    items = [
        items[0].getValues(),
        items[1].getValues()
    ];
    deepEqual(items, [ryah, tj], "Say woot");   
});

test('Get item that doen not exist', function() {
    var item = theList.get('id', 200);
    equals(item, null);   
});

test('Search', function() {
    var items = theList.search('Node'); 
    equals(items.length, 2);
    items = [
        items[0].getValues(),
        items[1].getValues()
    ];
    deepEqual(items, [ryah, tj]);
   theList.search(''); 
});

test('Filter', function() {
    var visibleItems = theList.filter(function(values) {
        if (+values.id < 3) {
            return true;
        } else {
            return false;
        }
    });
    equals(visibleItems.length, 2);
    equals(visibleItems[0].getValues().id, 1);
    equals(visibleItems[1].getValues().id, 2);
});

test('Restore from filter', function() {
   var visibleItems = theList.filter(false);
   equals(visibleItems.length, 5); 
});
