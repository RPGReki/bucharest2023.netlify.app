---
title: RONmania 2023 — Full Score Table
layout: 2021/data_table
sitemap: false
robots: noindex

---
[Back to the 2023 Tournament Page](/)

<table class="data-table">
<thead>
<tr>
<th>Rank</th>
<th>Given Name</th>
<th>Surname</th>
<th>EMA Number</th>
<th>Round 1</th>
<th>Round 2</th>
<th>Round 3</th>
<th>Round 4</th>
<th>Round 5</th>
<th>Round 6</th>
<th>Round 7</th>
<th>Round 8</th>
<th>Total</th>
</tr>
</thead>
<tbody>
{% assign skipped = 0 %}
{% for p in site.data.tournaments.202305 %}
<tr>
<td>{{ p.Rank }}</td>
<td>{{ p.GivenName }}</td>
<td>{{ p.Surname }}</td>
<td>{{ p.EmaID}}</td>
<td>{{ p.R1 }}</td>
<td>{{ p.R2 }}</td>
<td>{{ p.R3 }}</td>
<td>{{ p.R4 }}</td>
<td>{{ p.R5 }}</td>
<td>{{ p.R6 }}</td>
<td>{{ p.R7 }}</td>
<td>{{ p.R8 }}</td>
<td>{{ p.R9 }}</td>
<td>{{ p.Total }}</td>
</tr>
{% endfor %}
</tbody>
</table>
