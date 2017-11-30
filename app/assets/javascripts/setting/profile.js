$(document).ready(function() {
  $('.cancel-edit').on('click', function() {
    var class_col_full = $(this).closest('.col_full');
    class_col_full.find('.current-info').toggle('slow');
    class_col_full.find('.form-edit-profile').toggle('slow');
  });

  $('.submit-edit-ajax').on('click', function(e) {
    e.preventDefault();
    var input_info_user, type, url, class_col_full;
    class_col_full = $(this).closest('.col_full')
    type = class_col_full.find('.form-edit-profile').attr('id')
      .replace('edit-', '');
    url = class_col_full.find('form').attr('action');
    input_info_user = $(this).closest('.form-edit-profile')
      .find('.form-control').val();
    $.ajax({
      url: url,
      method: 'PATCH',
      dataType: 'JSON',
      data: {type :type, input_info_user: input_info_user}
    })
    .done(function(data) {
      if (data.info_status == 'success') {
        $('#' + type).html(data.html);
        class_col_full.find('.form-control')[0].defaultValue = data.html;
        class_col_full.find('.form-edit-profile').toggle('slow');
        class_col_full.find('.current-info').toggle();
        if (type == 'name') {
          $('.site-name').html(data.html_site_name);
        }
        $.growl.notice({message: I18n.t('setting.profiles.update_success')});
      } else {
        $.growl.error({message: data.message});
      }
    })
    return false;
  });


  $('body').on('click', '.edit-toggle', function(){
    var edit_value, form_edit, all_form_edits, current_info, all_current_infos,
      class_col_full;

    edit_value = $(this).closest('.container')
      .find('.edit_info_user, .edit_user, .new_skill');
    for (var i = 0; i < edit_value.length; i++) {
      edit_value[i].reset();
    }

    form_edit = $(this).closest('.col_full').find('.form-edit-profile, .create-form');
    all_form_edits = $(this).closest('.container').find('.form-edit-profile, .create-form').not(form_edit).hide();

    current_info = $(this).closest('.col_full').find('.current-info');
    all_current_infos = $(this).closest('.container').find('.current-info').not(current_info).show();

    class_col_full = $(this).closest('.col_full');
    form_edit.toggle('slow');

    class_col_full.find('.current-info').toggle();
  })
});
