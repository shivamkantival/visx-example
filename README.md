## Visx Example

This is a simple code example showcasing how visx can be used to create visual insights charts

## Setup
```
- yarn install
- yarn start
```

### Insights covered

- All posts page
    - Heatmap shows number of posts on the platform per day for last 3 months
    - Line graph showing the same details as heatmap for past 30 days
    
- Authors page
    - Pie chart showing distribution of topics covered by some author across all of his/her posts
    - List of cards with basic details of a user along with heatmap of posts per day over last 60 days 
    
### Stack used

- Material-UI is used with default color palette to provide a standardised UI theme
- react-router is used for the sake of application routing
- Apollo-graphql's react client is being used as graphql data fetching client
- lodash is used extensively to use some functional reusable utils
- Visx is used as the basis for all graphical components
- dayjs is used for all epoch related manipulations and calculations

### Challenges

- For a dev with zero prior experience with visualisation,
  Learning curve was too steep. It was great, but steep 😅
    
- Data returned from mock API isn't structured to be consumed easily in the way we want to display it using charts.
  Especially which topics are actually relevant are not very clear.
  Neither is data fragmented by topic available, which is needed for any type of visualization around topics.
  
### Design decisions
- For simplicity, I've assumed that only topics with `likelihood` score of `>0.15` are only considered.
  If no topic clearing required `likelihood` is matched, only the first topic is picked.
  
- `Data for last 30 days` actually considers the end date of range as the latest post `createdAt` time.