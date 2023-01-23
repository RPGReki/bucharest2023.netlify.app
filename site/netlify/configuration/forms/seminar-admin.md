---
title: 2022 Seminarverwaltung
layout: 2021/data_table
sitemap: false
robots: noindex
permalink: /620c13c4df54cc0007a39520/admin/620c1a773445220008c74ef4/
---
Stand: {{ site.time | date: '%Y-%m-%d %H:%M %Z'}}

<table>
<tr><th>Vorname</th><th>Nachname</th><th>eMail</th><th>Datum</th><th>Status</th></tr>

{% for p in site.data.tournaments.202304.seminar-participants %}
<tr><td>{{ p.given_name }}</td><td>{{ p.surname }}</td><td>{{ p.email }}</td><td>{{ p.date }}</td><td>{{ p.country }}</td>
<td>{% unless p.status == "DEF" %}
<form name="Seminar Administration" method="POST" action="/eingabe-wird-verabeitet/" data-netlify="true">
  <input name="name" type="hidden" value="{{ p.give_name }} {{ p.surname }}">
  <input name="email" type="hidden" value="{{ p.email }}">
  <input name="id" type="hidden" value="{{ p.id }}" />
  <input name="action" type="hidden" value="DEF">
  <button type="sumbit" id="paidbutton" class="btn btn-primary btn-block">Bezahlt</button>
</form>
{% else %}
<b>Bezahlt</b>
{% endunless %}
</td><td>
{% unless p.status == "DEL" %}
<form name="Seminar Administration" method="POST" action="/eingabe-wird-verabeitet/" data-netlify="true">
  <input name="name" type="hidden" value="{{ p.give_name }} {{ p.surname }}">
  <input name="email" type="hidden" value="{{ p.email }}">
  <input name="id" type="hidden" value="{{ p.id }}" />
  <input name="action" type="hidden" value="DEL">
  <button type="sumbit" id="deletebutton" class="btn btn-primary btn-block">Löschen</button>
</form>
{% else %}
<b>Gelöscht</b>
{% endunless %}
</td></tr>
{% endfor %}
</table>
