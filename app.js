
// BUDGET CONTROLLER
var budgetController = (function () {







})();


 // UI CONTROLLER
var UIController = (function(){




})();



// GLOBAL APP CONTROLLER
var Controller = (function (budgetCtrl , UICtrl) {
  function ctrlAddItem() {
    // 1. get the field input data
    // 2. add the item to the buget controller
    // 3. add the item to the UI
    // 4. calculate the budget
    // 5. display the budget on the UI


    console.log("it works yaaaaai!");


  }

document.querySelector('.add__btn').addEventListener('click', ctrlAddItem );
document.addEventListener('keypress', function(event) {
  if (event.keyCode === 13 || event.watch === 13) {
    ctrlAddItem();
  }
});

})(budgetController , UIController);
