require('./bootstrap');
require('../plugins/bootstrap/js/bootstrap.bundle.min.js');
require('../plugins/overlayScrollbars/js/jquery.overlayScrollbars.min.js');
require('../dist/js/adminlte.js');
require('../plugins/jquery-mousewheel/jquery.mousewheel.js');
require('../plugins/raphael/raphael.min.js');
require('jquery-mapael');
require('chart.js');
require('datatables.net-bs4');
require('datatables.net-buttons-bs4');
require('datatables.net-buttons/js/buttons.colVis.js');
require('datatables.net-buttons/js/buttons.flash.js');
require('datatables.net-buttons/js/buttons.html5.js');
require('datatables.net-buttons/js/buttons.print.js');
require('datatables.net-responsive-bs4');
require('datatables.net-scroller-bs4');
// require('jszip');
// require('pdfmake');
require('magnific-popup');
import Inputmask from "inputmask";
require('select2');
require('tinymce');
require('tinymce/themes/silver/theme');
require('tinymce/icons/default/icons');

require('tinymce/plugins/print');
require('tinymce/plugins/preview');
require('tinymce/plugins/paste');
// require('tinymce/plugins/casechange');
require('tinymce/plugins/importcss');
// require('tinymce/plugins/tinydrive');
require('tinymce/plugins/searchreplace');
require('tinymce/plugins/autolink');
require('tinymce/plugins/autosave');
require('tinymce/plugins/save');
require('tinymce/plugins/directionality');
require('tinymce/plugins/code');
require('tinymce/plugins/visualblocks');
require('tinymce/plugins/visualchars');
require('tinymce/plugins/fullscreen');
require('tinymce/plugins/link');
// require('tinymce/plugins/mediaembed');
require('tinymce/plugins/template');
require('tinymce/plugins/codesample');
require('tinymce/plugins/table');
require('tinymce/plugins/charmap');
require('tinymce/plugins/hr');
require('tinymce/plugins/pagebreak');
require('tinymce/plugins/nonbreaking');
require('tinymce/plugins/toc');
require('tinymce/plugins/insertdatetime');
require('tinymce/plugins/advlist');
// require('tinymce/plugins/checklist');
require('tinymce/plugins/wordcount');
// require('tinymce/plugins/tinymcespellchecker');
// require('tinymce/plugins/a11ychecker');
require('tinymce/plugins/imagetools');
require('tinymce/plugins/textpattern');
require('tinymce/plugins/noneditable');
require('tinymce/plugins/help');
// require('tinymce/plugins/permanentpen');
// require('tinymce/plugins/pageembed');
// require('tinymce/plugins/tinycomments');
// require('tinymce/plugins/mentions');
require('tinymce/plugins/quickbars');
// require('tinymce/plugins/linkchecker');
require('tinymce/plugins/emoticons');
require('tinymce/plugins/emoticons/js/emojis');
// require('tinymce/plugins/advtable');
require('tinymce/plugins/anchor');
require('tinymce/plugins/image');
require('tinymce/plugins/media');
require('tinymce/plugins/lists');
require('bootstrap-tagsinput');


$(document).ready(function() {

    let table = $('#admin-datatable').DataTable({
        "ordering": true,
        // responsive: true,
        "scrollX": true,
        autoWidth: false,
        // dom: 'Blfrtip',
        // dom: '<"wrapper"Blfrtip>',
        // buttons: [
        //     'copy', 'csv', 'excel', 'pdf', 'print', 'colvis'
        // ]
    });
    table.buttons().container().appendTo( $('.col-sm-6:eq(0)', table.table().container() ) );

    $('.zoom-img').magnificPopup({
        type:'image',
        removalDelay: 300,
        mainClass: 'mfp-fade'
    });

    Inputmask().mask("input");

    $('.select2').select2({
        theme: 'bootstrap4',
    });

    tinymce.init({
        selector: 'textarea.tinymce-editor',
        plugins: 'print preview paste importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons',
        imagetools_cors_hosts: ['picsum.photos'],
        menubar: 'file edit view insert format tools table help',
        toolbar: 'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl',
        toolbar_sticky: true,
        autosave_ask_before_unload: true,
        autosave_interval: '30s',
        autosave_prefix: '{path}{query}-{id}-',
        autosave_restore_when_empty: false,
        autosave_retention: '2m',
        image_advtab: true,
        link_list: [
            { title: 'My page 1', value: 'http://www.tinymce.com' },
            { title: 'My page 2', value: 'http://www.moxiecode.com' }
        ],
        image_list: [
            { title: 'My page 1', value: 'http://www.tinymce.com' },
            { title: 'My page 2', value: 'http://www.moxiecode.com' }
        ],
        image_class_list: [
            { title: 'None', value: '' },
            { title: 'Some class', value: 'class-name' }
        ],
        importcss_append: true,
        file_picker_callback: function (callback, value, meta) {
            /* Provide file and text for the link dialog */
            if (meta.filetype === 'file') {
                callback('https://www.google.com/logos/google.jpg', { text: 'My text' });
            }
            
            /* Provide image and alt text for the image dialog */
            if (meta.filetype === 'image') {
                callback('https://www.google.com/logos/google.jpg', { alt: 'My alt text' });
            }
            
            /* Provide alternative source and posted for the media dialog */
            if (meta.filetype === 'media') {
                callback('movie.mp4', { source2: 'alt.ogg', poster: 'https://www.google.com/logos/google.jpg' });
            }
        },
        templates: [
            { title: 'New Table', description: 'creates a new table', content: '<div class="mceTmpl"><table width="98%%"  border="0" cellspacing="0" cellpadding="0"><tr><th scope="col"> </th><th scope="col"> </th></tr><tr><td> </td><td> </td></tr></table></div>' },
            { title: 'Starting my story', description: 'A cure for writers block', content: 'Once upon a time...' },
            { title: 'New list with dates', description: 'New List with dates', content: '<div class="mceTmpl"><span class="cdate">cdate</span><br /><span class="mdate">mdate</span><h2>My List</h2><ul><li></li><li></li></ul></div>' }
        ],
        template_cdate_format: '[Date Created (CDATE): %m/%d/%Y : %H:%M:%S]',
        template_mdate_format: '[Date Modified (MDATE): %m/%d/%Y : %H:%M:%S]',
        height: 400,
        image_caption: true,
        quickbars_selection_toolbar: 'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
        noneditable_noneditable_class: 'mceNonEditable',
        toolbar_mode: 'sliding',
        contextmenu: 'link image imagetools table',
        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
    });

});

require('./src/App');
