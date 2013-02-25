(function () {
  var termTemplate = "<span class='ui-autocomplete-term'>$1</span>";

  $(document).ready(function() {
    $("#origin, #destination").autocomplete({
      source: "/airports",
      minLength: 2,
      open: function(e,ui) {
            var acData = $(this).data('autocomplete');
            acData
                .menu
                .element
                .find('a')
                .each(function() {
                    var me = $(this);
                    var regex = new RegExp( '(' + acData.term + ')', 'gi' );
                    me.html( me.text().replace(regex, termTemplate) );
                });
        }
    });
  });
})();