---
title: Bucharest May 2023
layout: 2021/data_table
robots: noindex
---

## Registration

This two day tournament will take place from 2023-05-27 to 2023-05-28.

### Registration Form

<form name="Registration" method="POST" action="/thanks-for-registering/" id="contactform" class="form-horizontal" data-netlify="true" netlify-honeypot="captcha">
  <fieldset id="contact">
    <div>
      <label for="given_name">Given Name*</label>
      <input type="given_name" name="given_name" id="given_name" placeholder="Given Name" aria-required="true" required="true" />
      <label for="surname">Surname*</label>
      <input type="text" name="surname" id="surname" placeholder="Surname" aria-required="true" required="true" />
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
         I consent to having my data associated with this registration processed by Netlify, stored and forwarded to the owner of this site.
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

{% comment %}
{:.h1.text-danger}
Registration closed. Please use our [contact form](/en/contact/) to message us and to be placed on the waiting list.{% endcomment %}

{:.mt-3}
## Format and Timetable

This tournament has 9 hanchan with 90 minutes each and will be played according to [EMA Riichi Competition Rules from April 2016](http://mahjong-europe.org/portal/images/docs/Riichi-rules-2016-EN.pdf).

### Friday Evening

{:.data-table-plain}
| Time                        | Event                       |
| --------------------------- | --------------------------- |
|19:30&#x202f;--&#x202f;22:00 |Pre-Registration and Social Play |

{:.mt-3}
### 1st Day (Saturday)

{:.data-table-plain}
| Time                         | Event       |
| ---------------------------- | ----------- |
| 09:00&#x202f;--&#x202f;09:30 | Registration |
| 09:30&#x202f;--&#x202f;09:45 | Opening Ceremony |
| 09:45&#x202f;--&#x202f;11:15 | 1st Hanchan  |
| 11:15&#x202f;--&#x202f;11:30 | Break       |
| 11:30&#x202f;--&#x202f;13:00 | 2nd Hanchan  |
| 13:00&#x202f;--&#x202f;13:45 | Lunch |
| 13:45&#x202f;--&#x202f;15:15 | 3rd Hanchan  |
| 15:15&#x202f;--&#x202f;15:30 | Break       |
| 15:30&#x202f;--&#x202f;17:00 | 4th Hanchan  |
|                              | Beer, Snacks and Social Play |

{:.mt-3}
### 2nd Day (Sunday)

{:.data-table-plain}
| Time                        | Event        |
| ---------------------------- | ------------ |
| 09:45&#x202f;--&#x202f;11:15 | 5th Hanchan  |
| 11:15&#x202f;--&#x202f;11:30 | Break        |
| 11:30&#x202f;--&#x202f;13:00 | 6th Hanchan  |
| 13:00&#x202f;--&#x202f;13:45 | Lunch        |
| 13:45&#x202f;--&#x202f;15:15 | 7th Hanchan  |
| 15:15&#x202f;--&#x202f;15:30 | Break        |
| 15:30&#x202f;--&#x202f;17:00 | 8th Hanchan  |
| 17:00&#x202f;--&#x202f;17:30 | Award Ceremony |

{% comment %}
## Seating & Personal Scores

<form method="GET" action="/2023/player">
  <div class="row my-4">
  <label class="col-4 align-self-end" for="id">Player Number</label>
  <input name="id" id="id" placeholder="Player Number" aria-required="true" required="true" class="col-4">
  <button type="sumbit" class="btn btn-primary btn-block col-4">Go to Player Page</button>
  </div>
</form>
{% endcomment %}

{:.mt-3}
## Participants

<table class="data-table">
<thead>
<tr>
<th>#</th>
<th>Given Name</th>
<th>Surname</th>
<th>EMA Number</th>
<th>Country</th>
<th>Status</th>
</tr>
</thead>
<tbody>
{% assign skipped = 0 %}
{% for p in site.data.participants.202305 %}
{% if p.status == "DEL" %}{% assign skipped = skipped | plus: 1 %}{% continue %}{% endif %}
<tr>
<td>{{ forloop.index | minus: skipped }}</td>
<td>{{ p.given_name }}</td>
<td>{{ p.surname }}</td>
<td>{{ p.ema_id }}</td>
<td>{{ p.country }}</td>
<td>{{ p.status }}</td>
</tr>
{% endfor %}
</tbody>
</table>

{% comment %}
## Participants / Standings

<table class="data-table">
<thead>
<tr>
<th>Rank</th>
<th>Surname, Given Name</th>
<th>Total</th>
</tr>
</thead>
<tbody>
{% assign skipped = 0 %}
{% for p in site.data.tournaments.202305 %}
<tr>
<td>{{ p.Rank }}</td>
<td>{{ p.Surname }}, {{ p.GivenName }}</td>
<td>{{ p.Total }}</td>
</tr>
{% endfor %}
</tbody>
</table>

[Full Score Table](/en/tournaments/2023/heiwa-nomi-no-maajan-taisen-scores/){:ref="nofollow"}

{% endcomment %}
