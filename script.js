document.addEventListener("DOMContentLoaded", () => {
  const loader = document.getElementById("loader");
  const exploreBtn = document.getElementById("exploreBtn");
  const doors = document.getElementById("doors");
  const music = document.getElementById("weddingMusic");
  const musicBtn = document.getElementById("musicBtn");
  const whatsappBtn = document.getElementById("whatsappBtn");
  const calendarBtn = document.getElementById("calendarBtn");

  setTimeout(() => loader.classList.add("hide"), 1200);

  exploreBtn.addEventListener("click", () => {
    doors.classList.add("doors-open");
    music.play().then(() => musicBtn.textContent = "🔊").catch(() => {});
    setTimeout(() => doors.scrollIntoView({behavior:"smooth"}), 250);
    createPetals(18);
  });

  musicBtn.addEventListener("click", () => {
    if (music.paused) {
      music.play().then(() => musicBtn.textContent = "🔊").catch(() => {});
    } else {
      music.pause();
      musicBtn.textContent = "🔇";
    }
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    });
  }, {threshold:0.15});
  document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

  function createPetals(count) {
    for(let i=0;i<count;i++){
      const p=document.createElement("span");
      p.className="petal";
      p.textContent=Math.random()>.45?"✦":"❀";
      p.style.left=Math.random()*100+"vw";
      p.style.setProperty("--x",(Math.random()*180-90)+"px");
      p.style.animationDuration=(4+Math.random()*5)+"s";
      p.style.animationDelay=(Math.random()*2)+"s";
      document.querySelector(".petals").appendChild(p);
      setTimeout(()=>p.remove(),10000);
    }
  }
  setInterval(()=>createPetals(1),1800);

  whatsappBtn.addEventListener("click", () => {
    const name=document.getElementById("guestName").value.trim() || "Guest";
    const attendance=document.getElementById("attendance").value;
    const message=`Hello Arun & Priya!%0A%0AThis is ${encodeURIComponent(name)}.%0A${encodeURIComponent(attendance)} — sending my warm wishes for your wedding! ❤️`;
    // Replace 919999999999 with the couple's WhatsApp number.
    window.open(`https://wa.me/919999999999?text=${message}`,"_blank");
  });

  calendarBtn.addEventListener("click", () => {
    const ics=`BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
DTSTART:20261213T091500
DTEND:20261213T123000
SUMMARY:Arun & Priya Wedding
LOCATION:Sri Lakshmi Narayana Temple, Chennai, Tamil Nadu
DESCRIPTION:Wedding celebration of Arun & Priya
END:VEVENT
END:VCALENDAR`;
    const blob=new Blob([ics],{type:"text/calendar"});
    const url=URL.createObjectURL(blob);
    const a=document.createElement("a");
    a.href=url;a.download="Arun-Priya-Wedding.ics";a.click();
    URL.revokeObjectURL(url);
  });
});
