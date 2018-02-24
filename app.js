
// BUDGET CONTROLLER
var budgetController = (function () {
    // object constructor
    var Expense = function (id, description, value) {
      this.id = id;
      this.description = description;
      this.value = value;
    }
    var Income = function (id, description, value) {
      this.id = id;
      this.description = description;
      this.value = value;
    }
    var Data = {
      allItems : {
        exp : [],
        inc : []
      },
      totals: {
        exp:0,
        inc : 0
      }
    }
    return {
      addItem: function(type, des ,val){
        var newItem,ID;
        //create new id
        if (Data.allItems[type].length > 0) {
          ID = Data.allItems[type][Data.allItems[type].length - 1].id +1 ;
        }
        else {
          ID = 0
        }

        //create new item based on 'exp' or 'inc'
        if (type === "exp") {
          newItem = new Expense(ID , des ,val);

        }
        else if(type === "inc") {
          newItem = new Income(ID , des , val);
        }

        // push the item to the Data
        Data.allItems[type].push(newItem);
        // return newItem
        return newItem;
      },
      testing: function(){
        console.log(Data);
      }
    };





})();









 // UI CONTROLLER
var UIController = (function(){
  var DOMstrings = {
      inputType: '.add__type',
      inputDescription: '.add__description',
      inputValue: '.add__value',
      inputBtn:'.add__btn',
      icomeContainer:'.income__list',
      expensesContainer:'.expenses__list'

  };

  return {

      getInput:function(){
        return {
          type:document.querySelector(DOMstrings.inputType).value,
          description:document.querySelector(DOMstrings.inputDescription).value,
          value:document.querySelector(DOMstrings.inputValue).value
        };
      },
      addListItem: function(obj,type){
        // create html string eith placeholer text
        var html,newHtml,element;
        if (type==='inc') {
          element = DOMstrings.icomeContainer;
          html='<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'

        }
        else if (type==='exp') {
          element = DOMstrings.expensesContainer;
          html='<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
        }

        // replace placeholder text with actual Data
        newHtml = html.replace('%id%',obj.id);
        newHtml = newHtml.replace('%description%',obj.description);
        newHtml = newHtml.replace('%value%',obj.value);

        // insert the newHtml into the DOM
        document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
      },

      getDOMstrings:function () {
          return DOMstrings;
      }



  };
})();










// GLOBAL APP CONTROLLER
var Controller = (function (budgetCtrl , UICtrl) {

  function setupEventListner() {
    var DOM = UICtrl.getDOMstrings();
    document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem );
    document.addEventListener('keypress', function(event) {
      if (event.keyCode === 13 || event.watch === 13) {
        ctrlAddItem();
      }

    });
  };

  var DOM = UICtrl.getDOMstrings();

  function ctrlAddItem() {
    // 1. get the field input data
    var input = UICtrl.getInput();
    // 2. add the item to the buget controller
    var newItem = budgetCtrl.addItem(input.type , input.description , input.value);
    // 3. add the item to the UI
    UICtrl.addListItem(newItem , input.type);
    // 4. calculate the budget
    // 5. display the budget on the UI





  }

  return {
    init:function(){
      setupEventListner();
    }
  };

})(budgetController , UIController);

Controller.init();
