package pax.radio.brasil;

import android.os.Bundle; 
import com.facebook.react.ReactActivity;

import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.ReactRootView;
import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView;
import android.view.WindowManager;
import android.view.Window;
import android.view.View;
import android.os.Build;
import android.os.Bundle;
import android.graphics.Color;
import android.content.Intent;
import android.content.res.Configuration;
import org.devio.rn.splashscreen.SplashScreen;

public class MainActivity extends ReactActivity {

   @Override
    protected void onCreate(Bundle savedInstanceState) {
        // settingStatusBarTransparent();
        SplashScreen.show(this, R.style.SplashScreenTheme); 
        super.onCreate(savedInstanceState);   
    }
    
    public void settingStatusBarTransparent() {
      //Apparently, Android for some weird reason ignores all xml values for styles when you set only one programmatically
      //Screw you, Google!
      if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
          //getWindow().setNavigationBarColor(getResources().getColor(R.color.colorPrimary));
          //getWindow().setFlags(WindowManager.LayoutParams.FLAG_LAYOUT_NO_LIMITS, WindowManager.LayoutParams.FLAG_LAYOUT_NO_LIMITS);
          // getWindow().getDecorView().setSystemUiVisibility(View.SYSTEM_UI_FLAG_LAYOUT_STABLE | View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN); // | View.SYSTEM_UI_FLAG_LIGHT_STATUS_BAR
          // getWindow().setStatusBarColor(Color.TRANSPARENT);
          getWindow().setFlags(WindowManager.LayoutParams.FLAG_LAYOUT_NO_LIMITS, WindowManager.LayoutParams.FLAG_LAYOUT_IN_SCREEN);
      }
  }

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "RadioTrack";
  }

  @Override
  protected ReactActivityDelegate createReactActivityDelegate() {
    return new ReactActivityDelegate(this, getMainComponentName()) {
    
    @Override
    protected ReactRootView createRootView() {
      return new RNGestureHandlerEnabledRootView(MainActivity.this);
      }
    };
  }

  @Override
  public void onConfigurationChanged(Configuration newConfig) {
    super.onConfigurationChanged(newConfig);
    Intent intent = new Intent("onConfigurationChanged");
    intent.putExtra("newConfig", newConfig);
    sendBroadcast(intent);
  }
}
