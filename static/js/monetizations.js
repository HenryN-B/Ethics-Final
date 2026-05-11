let money = 0;
let lootbox_trys =0;
let battlepassInterval = null;

const money_button = document.getElementById("money-button");
const money_count = document.getElementById("money-count");

const upfront = document.getElementById("upfront");
const dlc_box = document.getElementById("dlc-cont");
const dlc = document.getElementById("dlc");
const ad = document.getElementById("ad");
const skin = document.getElementById("skin-button");
const lootbox = document.getElementById("loot-box");
const battlepass = document.getElementById("battlepass");
const bonus = document.getElementById("bonus");
const remove_skins = document.getElementById("remove-skins");

const cancel = document.getElementById("cancel");
const sections = document.querySelectorAll(".monetization-section");
const navLinks = document.querySelectorAll(".stakeholder-nav-link");

const input_switch = document.getElementById("toggle-switch");

input_switch.addEventListener("click", function(event){ 
    if(!input_switch.checked) {
        upfront.classList.add("hidden");
        dlc.classList.add("hidden");
        ad.classList.add("hidden");
        lootbox.classList.add("hidden");
        battlepass.classList.add("hidden");
        bonus.classList.add("hidden");
        cancel.classList.add("hidden");
        const cards = document.querySelectorAll('.mon');
        console.log(cards);
        cards.forEach((card) => {
            card.style.backgroundColor = "transparent";
        });
        skin.classList.add("hidden");
    } else {
        upfront.classList.remove("hidden");
        dlc.classList.remove("hidden");
        ad.classList.remove("hidden");
        lootbox.classList.remove("hidden");
        battlepass.classList.remove("hidden");
        bonus.classList.remove("hidden");
        cancel.classList.remove("hidden");
        skin.classList.remove("hidden");
    }

});


money_button.addEventListener("click", function(event) {
    console.log("click" );
    money = money + 10;
    updateMoney();
});

input_switch.addEventListener("click", function(event) {
    

});

// Upfront click event 
upfront.addEventListener("click", function(event) {
    if (!upfront.classList.contains("hidden")) {
        if (money < 60) {
            alert("Need more pengles");
        return;
        }
        money -= 60;
        upfront.classList.add("hidden");
        updateMoney();
        dlc_box.classList.remove("hidden")
    }
});

// DLC click event 
dlc.addEventListener("click", function(event) {
    if (!dlc.classList.contains("hidden")) {
        if (money < 20) {
            alert("Need more pengles");
        return;
        }
        money -= 20;
        dlc.classList.add("hidden");
        updateMoney();
    }
});

// Ad click event
ad.addEventListener("click", function(event) {
    console.log("click")
    if (!ad.classList.contains("hidden")) {
        console.log("showing add")
        const adOverlay = document.getElementById("ad-overlay");
        const adClose = document.getElementById("ad-close");
        adOverlay.classList.remove("hidden")
        setTimeout(function() {
        adClose.classList.remove("hidden");
        }, 10000);

        adClose.addEventListener("click", function() {
        adOverlay.classList.add("hidden");
        ad.classList.add("hidden");
        });        
    }
});

// Skin click event 
skin.addEventListener("click", function(event) {
    if (money < 10) {
        alert("Need more pengles");
        return;
    }
    money -= 10;
    const cards = document.querySelectorAll('.mon');
    cards.forEach((card) => {
        card.style.backgroundColor = "rgb(245, 179, 189)";
    });
    updateMoney();
});

remove_skins.addEventListener("click", function(event) {
    const cards = document.querySelectorAll('.mon');
    cards.forEach((card) => {
        card.style.backgroundColor = "transparent";
    });
    updateMoney();
});


// lootbox click event 
lootbox.addEventListener("click", function(event) {
    if (!dlc.classList.contains("hidden")) {
        if (money < 10) {
            alert("Need more pengles");
        return;
        }
        money -= 10;
        updateMoney();
        if (lootbox_trys == 0) {
            lootbox_trys += 1;
            alert("You won 3 pengles");
            money +=3;
            updateMoney();
        } else if (lootbox_trys == 1) {
            lootbox_trys += 1;
            alert("Unlucky you lost");
        } else if (lootbox_trys == 2) {
            lootbox_trys += 1;
            alert("You won 20 pengles");
            money +=3;
            updateMoney();

        } else {
            lootbox.classList.add("hidden");
        }
    }
});

// battlepass click event
battlepass.addEventListener("click", function(event) {
    // check if player has enough money to start
    if (money < 10) {
        alert("Need more pengles");
        return;
    }

    battlepass.classList.add("hidden");

    money -= 10;
    updateMoney();

    // charge every 10 seconds
    battlepassInterval = setInterval(function () {
        if (money < 10) {
            clearInterval(battlepassInterval);
            alert("Battle Pass subscription cancelled (not enough pengles)");
            battlepass.classList.remove("hidden");
            return;
        }
        money -= 10;
        updateMoney();
    }, 10000);
});

cancel.addEventListener("click", function () {
    clearInterval(battlepassInterval);
    battlepass.classList.remove("hidden");
});


// bonus click event
bonus.addEventListener("click", function () {
    if (money < 50) {
        alert("Need more pengles");
        return;
    }

    bonus.classList.add("hidden");
    money -= 50;
    updateMoney();

    // add every 10 seconds
    const bonusInterval = setInterval(function () {
        money += 10;
        updateMoney();

    }, 10000);
});

function updateMoney() {
    money_count.innerText = money;
}


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