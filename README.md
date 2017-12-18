# Whistle
## Simulation Environment setup

```
• Enable iOS Simulator on Xcode
Preferences > Locations > Enable Command Line Tools

• Enable Android Studio Simulator
facebook.github.io/react-native/docs/getting-started.html

```
## Run commands

```
$ cd mobile_whistle/Whistle

Do this only on first run
$ npm install

$ react-native run-android 
or
$ react-native run-ios
```
## Splash Screen Set Up
```
• Create required appicon and splashicon on
ticons.fokkezb.nl

• iOS Setup

1. Go to your project folder
2. Open the ios folder
3. Go to the file that has .xcodeproj as the extension, which should be Whistle.xcodeproj
4. Open this file in your Xcode
5. Delete the launchScreen.xib file
6. Click on the Whistle folder, then go to the TARGETS section
7. Click on the General Tab on the top-left corner of your Xcode and scroll down to App Icons and Launch Images
8. Go to Launch Images Source and click Use Asset Catalog. Click on migrate
9. Remove the text LaunchScreen from Launch Screen File
10. Go back to your project folder and open the Images.xcassets file. You should see AppIcon and LaunchImage
11. Finally, drag the splash screen images that has been generated initially to the Launch Image box

• Android Setup

https://medium.com/handlebar-labs/how-to-add-a-splash-screen-to-a-react-native-app-ios-and-android-30a3cec835ae