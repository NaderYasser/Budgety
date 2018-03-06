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

  function calculateTotal(type) {
    var sum = 0;
    Data.allItems[type].forEach(function (current) {
      sum = sum + current.value;
    });
    Data.totals[type] = sum;
  }
  var Data = {
    allItems: {
      exp: [],
      inc: []
    },
    totals: {
      exp: 0,
      inc: 0
    },
    budget: 0,
    percentage: -1
  }
  return {
    addItem: function (type, des, val) {
      var newItem, ID;
      //create new id
      if (Data.allItems[type].length > 0) {
        ID = Data.allItems[type][Data.allItems[type].length - 1].id + 1;
      } else {
        ID = 0
      }

      //create new item based on 'exp' or 'inc'
      if (type === "exp") {
        newItem = new Expense(ID, des, val);

      } else if (type === "inc") {
        newItem = new Income(ID, des, val);
      }

      // push the item to the Data
      Data.allItems[type].push(newItem);
      // return newItem
      return newItem;
    },
    calculateBudget: function () {
      // calculate total incomes and expenses
      calculateTotal('exp');
      calculateTotal('inc');
      // calculate the budget
      Data.budget = Data.totals.inc - Data.totals.exp;
      //calculate the percentage of the expenses
      if (Data.totals.inc > 0) {
        Data.percentage = Math.round((Data.totals.exp / Data.totals.inc) * 100);
      }else{
        Data.percentage = -1; //basicly don't exist XD
      }
    },
    getBudget:function(){
      return{
        budget:Data.budget,
        totalInc:Data.totals.inc,
        totalExp:Data.totals.exp,
        percentage:Data.percentage
        
      };
    },

    testing: function () {
      console.log(Data);
    }
  };





})();









// UI CONTROLLER
var UIController = (function () {
  var DOMstrings = {
    inputType: '.add__type',
    inputDescription: '.add__description',
    inputValue: '.add__value',
    inputBtn: '.add__btn',
    icomeContainer: '.income__list',
    expensesContainer: '.expenses__list',
    budgetLabel:'.budget__value',
    incomeLabel:'.budget__income--value',
    expensLabel:'.budget__expenses--value',
    percentageLabel:'.budget__expenses--percentage'



  };

  return {

    getInput: function () {
      return {
        type: document.querySelector(DOMstrings.inputType).value,
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: parseFloat(document.querySelector(DOMstrings.inputValue).value) // parseFloat() converts strings to float...
      };
    },
    addListItem: function (obj, type) {
      // create html string eith placeholer text
      var html, newHtml, element;
      if (type === 'inc') {
        element = DOMstrings.icomeContainer;
        html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'

      } else if (type === 'exp') {
        element = DOMstrings.expensesContainer;
        html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
      }

      // replace placeholder text with actual Data
      newHtml = html.replace('%id%', obj.id);
      newHtml = newHtml.replace('%description%', obj.description);
      newHtml = newHtml.replace('%value%', obj.value);

      // insert the newHtml into the DOM
      document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
    },
    clearFields: function () {
      var fields, fieldsArr;
      fields = document.querySelectorAll(DOMstrings.inputDescription + ',' + DOMstrings.inputValue);
      fieldsArr = Array.prototype.slice.call(fields);
      fieldsArr.forEach(function (current, index, Array) {
        current.value = '';
      });
      fieldsArr[0].focus();
    },
    
    displayBudget : function(obj) {
        document.querySelector(DOMstrings.budgetLabel).textContent = obj.budget;
        document.querySelector(DOMstrings.incomeLabel).textContent = obj.totalInc;
        document.querySelector(DOMstrings.expensLabel).textContent = obj.totalExp;        
        if (obj.percentage > 0) {
            document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage +'%';
                      
        }else{
          document.querySelector(DOMstrings.percentageLabel).textContent ='--';
        }
        
    },

    getDOMstrings: function () {
      return DOMstrings;
    }



  };
})();










// GLOBAL APP CONTROLLER
var Controller = (function (budgetCtrl, UICtrl) {

  function setupEventListner() {
    var DOM = UICtrl.getDOMstrings();
    document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);
    document.addEventListener('keypress', function (event) {
      if (event.keyCode === 13 || event.watch === 13) {
        ctrlAddItem();
      }

    });
  };

  function updateBudget() {
    // 1. calculate the budget
    budgetCtrl.calculateBudget();
    // 2. return the budget
    var budget = budgetCtrl.getBudget();
    // 3. disply the budget in the UI
    UICtrl.displayBudget(budget);
    console.log(budget);
  }

  function ctrlAddItem() {
    // 1. get the field input data
    var input = UICtrl.getInput();

    if (input.description !== "" && !isNaN(input.value) && input.value > 0) {
      // 2. add the item to the buget controller
      var newItem = budgetCtrl.addItem(input.type, input.description, input.value);
      // 3. add the item to the UI
      UICtrl.addListItem(newItem, input.type);
      // 4. clear input fields
      UICtrl.clearFields();

    }
    // 5. calculate the budget
    updateBudget();
    // 6. display the budget on the UI
    




  }

  return {
    init: function () {
      setupEventListner();
    UICtrl.displayBudget({
      budget:0,
      totalInc:0,
      totalExp:0,
      percentage:-1}
    );
      
    }
  };

})(budgetController, UIController);

Controller.init();