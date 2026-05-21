const allViews = document.querySelectorAll('.view');

function showView(viewId) {
    allViews.forEach(view => {
        view.classList.remove('active');
    });
    
    document.getElementById(viewId).classList.add('active');

    //get navbar menu to close when you click a link//
    const menu = document.getElementById('navbarNav');
    const bsCollapse = bootstrap.Collapse.getInstance(menu);

    if (bsCollapse && menu.classList.contains('show')) {
        bsCollapse.hide();
    }
}

document.getElementById('hero-btn').addEventListener('click', () => showView('hero'));
document.getElementById('about-btn').addEventListener('click', () => showView('about'));
document.getElementById('skills-btn').addEventListener('click', () => showView('skills'));
document.getElementById('projects-btn').addEventListener('click', () => showView('projects'));
document.getElementById('contact-btn').addEventListener('click', () => showView('contact'));

document.getElementById('hero-project-btn').addEventListener('click', () => showView('projects'));