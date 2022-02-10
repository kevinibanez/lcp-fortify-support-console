
$(document).ready(function () {
    $('.horizontal-actions').on('click', function (e) { toggleDetails(this); });
});

function toggleDetails(that) {
    let index = (that.getElementsByTagName('i')[0].id).substr(11);
    let icon = document.getElementById('expandIcon_' + index);
    let content = document.getElementById('expand_' + index);
    // console.log(that, index, icon, content);
    if (content && icon.classList.contains('fa-angle-right')) {
        console.log('you have passed the test to open this');
        let switchIcon = document.querySelectorAll('.fa-angle-down');
        let remove = document.querySelectorAll('.active');
        console.log(remove);
        // Remove any prexisting expansions.
        [].forEach.call(switchIcon, function (el) {
            el.className = 'fa fa-angle-right';
        });
        [].forEach.call(remove, function (el) {
            el.classList.remove("active");
        });
        content.classList.add('active');
        icon.className = 'fa fa-angle-down';
    } else {
        content.classList.remove('active');
        icon.className = 'fa fa-angle-right';
    }
}
