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

```

## Calendar Setup
```
npm install --save react-native-calendars

```
## Icons Setup
```
npm i react-native-vector-icons --save && react-native link react-native-vector-icons
npm i react-native-elements --save
```
## NativeBase Setup
```
npm install native-base --save
react-native link
```

## RadioButton setup
```
npm i react-native-simple-radio-button --save
```

## Push Notification
```
npm install --save react-native-push-notification
react-native link
```

## Google Maps API
```
npm install --save react-native-maps-google
```

### Setup IOS

1. Go get yourself a cup of coffee, this could take a while...
2. Open up your React Native project in XCode, this is the .xcodeproj file in the ios directory of your React Native project.
3. Click on the root of your project in XCode, then select your project's main target. Select Build Settings and then search for Framework Search Paths. Add $(PROJECT_DIR)/../node_modules/react-native-maps-google/ios_modules/GoogleMaps-1.11.1/Frameworks to the framework search path list and make sure it is set to recursive.
Now search for Header Search Paths. Add $(SRCROOT)/../node_modules/react-native-maps-google to the header search path list and make sure that it is also set to recursive.
Open node_modules/react-native-maps-google/ios in Finder and locate the PPTMapView.xcodeproj package. Drag this file into the XCode project navigator. You can keep this in the Libraries group along with all the other React Native packages.
Expand the PPTMapView.xcodeproj tree and select GoogleMapsApi.plist - drag this into the group which contains your AppDelegate.h and AppDelegate.m files; this group is usually named after your app. When prompted ensure that Copy Items if Needed is deselected when prompted, this will prevent this file from being committed into source control. Open up the file and enter your Google API key into the value column of the row named API Key.
Open up AppDelegate.m and add #import "PPTGoogleMapProvider.h" at the top of the file. Then add [PPTGoogleMapProvider provideAPIKey]; somewhere in the application method, ideally at the top.
Select the Google Maps SDK group in PPTMapView.xcodeproj, drag these packages into the Libraries group of your React Native project and ensure that Copy Items if Needed is deselected when prompted.
Click on the root of your project in XCode, then select your project's main target. Click on Build Phases and double check that all the libraries and frameworks were automatically added to the Link Binary With Libraries phase. If they weren't, select all the packages in the Google Maps SDK group (apart from GoogleMaps.bundle) and drag them into this build phase.
At the bottom of the Link Binary With Libraries list, click the + button and search for libPPTMapView.a (it should be in the Workspace folder). Select libPPTMapView.a and click the Add button. Scroll back up to the top of the list and double check that it was added.
Hit Cmd+R and make sure the app runs!


### Setup Android
```
Open up your React Native project in Android Studio, this is the android directory in your React Native project.
Expand Gradle Scripts from within the project tree and open settings.gradle. Replace the line in the script which states include ':app' with include ':app', ':pptmapview' (or append ':pptmapview' to the end of the include statement if you're already including other modules).
Add the following line to the end of settings.gradle:
project(':pptmapview').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-maps-google/android/library')
Open up your app module build.gradle file and add the following line to the end of your dependancies section:
compile project(path: ':pptmapview')
You should now be prompted to run a Gradle project sync so press Sync Now in the gold toolbar that should be visible.
Open your projects MainActivity class and import the following package:
import xyz.plan.android.pptmapview.PPTGoogleMapPackage;
Find the line in your main activity class which has the following on it - .addPackage(new MainReactPackage()), add the following line below:
.addPackage(new PPTGoogleMapPackage())
Expand the pptmapview package in your project explorer and then expand the manifests directory. Open up the AndroidManifset.xml and find the node with the key com.google.android.geo.API_KEY. Enter your Google API key into the android:value property and save the file. This file will be kept out of source control so it is safe to store the API key in here.
Hit Ctrl+R and make sure the app runs!

```
