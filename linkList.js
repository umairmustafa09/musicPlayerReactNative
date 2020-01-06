function LinkedList() { 
    var length = 0; 
    var head = null; 
  
    var Node = function(song){
      this.song = song; 
      this.next = null; 
    }; 
  
    this.size = function(){
      return length;
    };
  
    this.head = function(){
      return head;
    };
  
    this.add = function(song){
      var node = new Node(song);
      if(head === null){
          head = node;
      } else {
          var currentNode = head;
  
          while(currentNode.next){
              currentNode  = currentNode.next;
          }
          currentNode.next = node;
      }
      length++;
    }; 
  
    this.elementAt = function(index) {
      var currentNode = head;
      var count = 0;
      while (count < index){
          count ++;
          currentNode = currentNode.next
      }
      return currentNode.song;
    };    
    
    this.removeAt = function(index) {
      var currentNode = head;
      var previousNode;
      var currentIndex = 0;
      if (index < 0 || index >= length){
          return null
      }
      if(index === 0){
          head = currentNode.next;
      } else {
          while(currentIndex < index) {
              currentIndex ++;
              previousNode = currentNode;
              currentNode = currentNode.next;
          }
          previousNode.next = currentNode.next
      }
      length--;
      return currentNode.song;
    }
  } 

export default LinkedList;
