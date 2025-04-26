# rikshv-motion-serach
A website for searching among the motions submitted to the Rikshemvärnsting.

# The API
The website makes use of an API at 83.253.85.183:8080, it has to end points

- `/search`
- `/matches`

Which can be used like this to search for "hjälm" and to show all matches for "hjälm" in the motion "2019 Material del 1"

- `curl 83.253.85.183:8080/search?search_term="hjälm"`
- `curl 83.253.85.183:8080/matches?search_term="hjälm"&file="2019 Material del 1"`

There is no API authentication as this is a public site.

# Credits
This project, including the API is written, hosted and maintained by [Lukas Tonneman](https://www.linkedin.com/in/lukas-tonneman-2b2355145/).
