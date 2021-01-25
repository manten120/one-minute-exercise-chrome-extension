const BG = chrome.extension.getBackgroundPage();

const flags = BG.flags;

$('.form-check-input').each((index, element) => {
  if (flags[index]) {
    $(element).prop('checked', true);
  } else {
    $(element).prop('checked', false);
  }
});

$('.form-check-input').on('click', function() {
  const checkBox = $(this);
  const isChecked = checkBox.prop('checked');
  const time = checkBox.attr('id').replace('check', '');

  if (isChecked) {
    BG.toggleFlags(time);
  } else {
    BG.toggleFlags(time);
  }
});

$('#close-popup').on('click', function() {
  window.close();
});