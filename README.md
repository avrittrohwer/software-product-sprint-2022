<!--This directory is where you'll write all of your code!

By default it contains a barebones portfolio web app. 

## Run server locally in cloudshell

To run the server locally, you'll need to start a datastore emulator first.  Install the emulator by following https://cloud.google.com/datastore/docs/tools/datastore-emulator#installing_the_emulator.

Steps for running the server:

1. In a cloudshell tab, start the emulator by running:

    ```
    gcloud beta emulators datastore start --project avritt-sps-summer22 --data-dir ./.datastore
    ```

2. In another cloudshell tab, get the proper environment variables for the java server to connect to the datastore emulator:

    ```
    $(gcloud beta emulators datastore env-init --data-dir ./.datastore)
    ```

Then in the same choudshell tab, start the java server:

    ```
    mvn package exec:java
    ```

3. Click the 'Web Preview' > 'Preview on port 8080' button.

## Deploy code to app engine

To deploy to appengine, run:

```
mvn package appengine:deploy
```
-->