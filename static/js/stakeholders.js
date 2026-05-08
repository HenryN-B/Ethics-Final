const sections = document.querySelectorAll(".stakeholder-section");
const navLinks = document.querySelectorAll(".stakeholder-nav-link");

function handleIntersect(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      navLinks.forEach(function(link) {
        link.classList.remove("active");
      });
      const activeLink = document.querySelector('.stakeholder-nav-link[href="#' + entry.target.id + '"]');
      if (activeLink) activeLink.classList.add("active");
    }
  });
}

const observer = new IntersectionObserver(handleIntersect, {
  rootMargin: "-20% 0px -70% 0px"
});

sections.forEach(function(section) {
  observer.observe(section);
});
