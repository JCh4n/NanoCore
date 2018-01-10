# Update Behavior

Nano Adblocker will read `! Expires` header to extract update information, and defaults to 3 days if the header is missing. uBlock Origin 
will instead defaults to 5 days. The default filters set in Nano Adblocker also have slightly shorter update period, please check 
`assets.json` for more details. 

The hosts files in the default filters set have 5 days update period, if you are the maintainer of the host file and are unhappy about 
this, please open an issue and we will change it. For other filters, please use `! Expire` header to set update delay. 

The lower cap of update period is 1 day and the upper cap is 30 days. uBlock Origin will instead use a lower cap of 2 days and no upper 
cap. Nano Adblocker respects your choise as filter maintainer to choose daily update, but you are responsible in making sure doing so 
will not generate excessive traffics. 

Nano Adblocker allows you to use hour as unit, but will round it *up* to the nearest day, the caps still apply. uBlock Origin will 
instead ignore the header. 

You must use integer in either case, otherwise the header is ignored. 