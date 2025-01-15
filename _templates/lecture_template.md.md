---
course: <% tp.file.title.split("_")[0] %> <% tp.file.title.split("_")[1] %>
type: lecture
lecture_num: <% tp.file.title.split("_")[3] %>
date: <% tp.date.now("M/D") %>
---

# <% tp.file.title.split("_")[0] %> <% tp.file.title.split("_")[1] %> Seminar <% tp.file.title.split("_")[3] %>
- ## <% tp.date.now("M/D") %>

## Topic

- 

---

<%*
let num = Number(tp.file.title.split("_")[3]);
let prev = num > 1 ? `Previous: [PHYS 87 Seminar ${num-1}](PHYS_87_SE_${num-1}.md).` : "";
let next = num < 30 ? `Next: [PHYS 87 Seminar ${num+1}](PHYS_87_SE_${num+1}.md).` : "";
if (prev && next) {
    tR += prev + "\n" + next;
} else {
    tR += prev + next;
}
%>