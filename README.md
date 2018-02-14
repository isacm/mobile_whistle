# Whistle

• Mobile application to help referees manage their nominations and quickly respond to one

• It is part of an larger product containing an web application and an dedicated API

• Developed as the project for the University of Minho's course, Projecto em Engenharia Informática 2017/2018

![alt text](http://res.cloudinary.com/ddepgavbp/image/upload/c_scale,w_226/v1518637285/Captura_de_ecrã_2018-02-14_às_19.39.48.png)

![alt text](http://res.cloudinary.com/ddepgavbp/image/upload/c_scale,w_283/v1518637671/Captura_de_ecrã_2018-02-14_às_19.44.37.png)

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

• Xcode (macOS exclusive) : https://itunes.apple.com/us/app/xcode/id497799835?mt=12

• Android Studio : https://developer.android.com/studio/index.html

#### Node
```
$ brew install node
```
#### Watchman
```
$ brew install watchman
```

#### The React Native CLI
```
npm install -g react-native-cli
```
### Simulation Environment setup

#### Enable iOS Simulator (macOS exclusive)

```
Open Xcode

Preferences > Locations > Enable Command Line Tools
```

#### Enable Android Studio Simulator
```
Follow instructions here:

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

## React Navigation Setup
```
npm install --save react-navigation

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

## Open native OS map app
```
npm install --save react-native-open-maps
```

## Open native OS apps like phone,messages and mail
```
npm install react-native-openanything
```

## Setup maps
```
npm install react-native-maps --save
```

#### IOS Setup
```
Setup your Podfile (found at /ios/Podfile as below, replace all references to _YOUR_PROJECT_TARGET_ with your project target (it's the same as project name by default), and then run pod install while in the ios folder.
```
```pod
# Uncomment the next line to define a global platform for your project
# platform :ios, '9.0'

target '_YOUR_PROJECT_TARGET_' do
  rn_path = '../node_modules/react-native'
  rn_maps_path = '../node_modules/react-native-maps'

  pod 'yoga', path: "#{rn_path}/ReactCommon/yoga/yoga.podspec"
  pod 'React', path: rn_path, subspecs: [
    'Core',
    'RCTActionSheet',
    'RCTAnimation',
    'RCTGeolocation',
    'RCTImage',
    'RCTLinkingIOS',
    'RCTNetwork',
    'RCTSettings',
    'RCTText',
    'RCTVibration',
    'RCTWebSocket',
    'BatchedBridge'
  ]

  pod 'react-native-maps', path: rn_maps_path

  pod 'GoogleMaps'  # Remove this line if you don't want to support Google Maps on iOS
  pod 'react-native-google-maps', path: rn_maps_path  # Remove this line if you don't want to support Google Maps on iOS
end

post_install do |installer|
  installer.pods_project.targets.each do |target|
    if target.name == 'react-native-google-maps'
      target.build_configurations.each do |config|
        config.build_settings['CLANG_ENABLE_MODULES'] = 'No'
      end
    end
    if target.name == "React"
      target.remove_from_project
    end
  end
end
```

#### Setup Android

