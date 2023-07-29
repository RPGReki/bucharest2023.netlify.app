---
title: 2023 Tournament Administration
layout: 2021/data_table
sitemap: false
robots: noindex
permalink: /61fbaea93f690300071fa4a4/admin/61fbbb73436202000797b3b9/
---

Last Update: {{ site.time | date: '%Y-%m-%d %H:%M %Z'}}

<table>
<tr><th>Given Name</th><th>Surname</th><th>EMA Number</th><th>eMail</th><th>Date</th><th>Country</th><th>Status</th></tr>

{% for p in site.data.tournaments.202311.participants %}
<tr><td>{{ p.given_name }}</td><td>{{ p.surname }}</td><td>{{ p.ema_id }}</td><td>{{ p.email }}</td><td>{{ p.date | date: "%Y-%m-%d %H:%M" }}</td><td>{{ p.country }}</td>
<td>{% unless p.status == "DEF" %}
<form name="Administration" method="POST" action="/eingabe-wird-verabeitet/" data-netlify="true">
  <input name="name" type="hidden" value="{{ p.give_name }} {{ p.surname }}">
  <input name="email" type="hidden" value="{{ p.email }}">
  <input name="id" type="hidden" value="{{ p.id }}" />
  <input name="action" type="hidden" value="DEF">
  <button type="sumbit" id="paidbutton" class="btn btn-primary btn-block">Paid</button>
</form>
{% else %}
<b>Paid</b>
{% endunless %}
</td><td>
{% unless p.status == "DEL" %}
<form name="Administration" method="POST" action="#" data-netlify="true">
  <input name="name" type="hidden" value="{{ p.give_name }} {{ p.surname }}">
  <input name="email" type="hidden" value="{{ p.email }}">
  <input name="id" type="hidden" value="{{ p.id }}" />
  <input name="action" type="hidden" value="DEL">
  <button type="sumbit" id="deletebutton" class="btn btn-primary btn-block">Delete</button>
</form>
{% else %}
<b>Deleted</b>
{% endunless %}
</td></tr>
{% endfor %}
</table>

## Sign Up Form for “Waiting List”

<form name="Registration" method="POST" action="#" id="contactform" class="form-horizontal" data-netlify="true" netlify-honeypot="captcha">
  <fieldset id="contact">
    <div>
      <label for="given_name">Given Name*</label>
      <input type="given_name" name="given_name" id="given_name" placeholder="First Name" aria-required="true" required="true" />
      <label for="surname">Surname*</label>
      <input type="text" name="surname" id="surname" placeholder="Last Name" aria-required="true" required="true" />
      <label for="email">eMail*</label>
      <input type="email" name="email" id="email" placeholder="mail@domain.tld" aria-required="true" required="true" />
      <label for="ema_id">EMA Number</label>
      <input type="text" name="ema_id" id="ema_id" placeholder="" />
      <label for="country">Country*</label>
      <input name="text" id="country" placeholder="Country" aria-required="true" required="true">
    </div>
    <div class="row mx-2">
      <input type="checkbox" name="accept-policy" id="accept-policy" aria-required="true" required="true" class="col-auto mt-2">
      <label for="accept-policy" class="col">
         I consent to having my data associated with this registration processed by Cloudflare and Netlify, stored and forwarded to the owner of this site.
      </label>
    </div>
    <div class="d-none">
      <input name="lang" type="hidden" value="{{ page.lang }}" />
      <label for="captcha">Captcha*</label>
      <input name="captcha" type="text" />
    </div>
    <div>
      <button type="sumbit" id="registrationbutton" class="btn btn-primary btn-block">Register</button>
    </div>
  </fieldset>
</form>