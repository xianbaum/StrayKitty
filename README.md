#StrayKitty
A cat toy

A little poem:

sheep.exe  
I am not a free

This software license is permissive because web software is difficult to keep free software.

##USAGE:

### 1. Host and include this script
><script src="StrayKitty.js"></script>

*NOTE* You don't have to host the script if you don't want to. You can alternatively include it by simply using this line this, hosted on Google Drive:
><script src="https://e2e3493ddb6598da36254fadac9e505550a42bd3.googledrive.com/secure/ALrMiJijxS7X8T58mnr03KdBfHsrhqJWbP5Es4cVsHeIduZQktttDo-5k71qyRE67BFxbceyvTiIDENfi1-wx5qkkNVKgdFr0KPWJQ3fOWhTVYj6TcZs5-Dkhx1Yr_v3mXXxfOr6UJl8Kw8EGikGOa8ATb0Wuzhp5N6TVb0MCkejmdn4JWLZkupUrhRgukXbSQS42EAbPbhg2A8O9H2drM7Nw8qfY075JNV-NGdcUZWsMKwGCjRzexOuGtP-zf6eisU4nCwybixWPiyGYD5s8Lw49yzV9X5j2FZngYbz1-0dXsiVDyQVTUa7zKwykO9wS7oJislnwRLXl4ShfrmQp_U4ZzC5OEXofcgeIufhWHN3FjbMbPp9EdcbIm5lKt74DrKEXukxS0-6k9DSwIZdr4htMdEeWhlP07C5aBlI9wScoKEBxfi-3eswgmRceW_R9P5Xy1KyaN2EbMNMh-FgZLMs-sdItvIfCvRz-X4uvCMQL9chEdh-iRozJ7AYBIu0S1mszFw3sc4HwQsh2n7IELpJDiwzEYO0QtleCE1NJuB0lFjYiKFyLduC1IXpyazl8Yi82txUTP5p/host/0B5aLusBWK-7fbWlUUFB3Y2FmWDQ/StrayKitty.js"></script>

### 2. Somewhere in your Javascript code after the page loads, write:
>StrayKitty.addKitty()  

*OPTIONAL*: StrayKitty.addKitty() can accept 3 values:

>StrayKitty.addKitty(0)

a Tabby Cat named Ginger
>StrayKitty.addKitty(1)

an unnamed (as of now) pink kitty
>StrayKitty.addKitty(2)

a Siamese cat named Jack-Jack
Otherwise, it will be a random kitty.

### 3. To remove a kitty, write:
>StrayKitty.removeKitty()

It removes the first kitty added. If there are no kitties left, then it does nothing.
