const showElement = (id) => {
  const showE = document.getElementById(id);
  const hideE = Array.from(document.getElementsByClassName('all-forms'));
  hideE.forEach(e => {
    if (!Array.from(e.classList).includes('d-none')) {
      e.classList.add('d-none');
    }
  })
  showE.classList.remove('d-none');
}
//// qull ////
// const quillp_en = new Quill('#p_desc_en', {
//   modules: {
//     toolbar: toolbarOptions
//   },
//   theme: 'snow'
// });
// const quillp_ar = new Quill('#p_desc_ar', {
//   modules: {
//     toolbar: toolbarOptions
//   },
//   theme: 'snow'
// });
///////project /////////

// const detailsTemp = `<label for="details" style="display: block;">تفاصيل المشروع</label>
// <input type="text" name="detailsnamear" class="form-control" style="width: 40%; display: inline;"
//     placeholder="تفاصيل" required>
// <input type="text" name="detailsdataar" class="form-control" style="width: 40%; display: inline;"
//     placeholder="اكتب التفصيلة" required>
// <hr>
// <label for="details" style="display: block;">project details</label>
// <input type="text" name="detailsnameen" class="form-control" style="width: 40%; display: inline;"
//     placeholder="details" required>
// <input type="text" name="detailsdataen" class="form-control" style="width: 40%; display: inline;"
//     placeholder="write details" required>
// <hr>`;

// const addDetails = (boxId, tId) => {
//   const box = document.getElementById(boxId);
//   const t = document.getElementById(tId);
//   const details = document.createElement('div');
//   details.innerHTML = detailsTemp;
//   box.insertBefore(details, t);
// }

var projectArEditor = new RichTextEditor("#projectTinaAr");
var projectEnEditor = new RichTextEditor("#projectTinaEn");
/*********************************** */
// const projectSubmit = (formId) => {
//   const form = document.getElementById('projectForm');

//   projectAr.value = projectArEditor.getHTMLCode();
//   projectEn.value = projectEnEditor.getHTMLCode();
//   form.submit();
// }