package com.regest;

import android.content.Intent;
import android.support.annotation.NonNull;

import com.facebook.react.ReactActivity;
import com.facebook.react.modules.core.PermissionListener;
import com.imagepicker.ImagePickerPackage;
import com.imagepicker.permissions.OnImagePickerPermissionsCallback;
import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.react.ReactPackage;
import com.oblador.vectoricons.VectorIconsPackage;

import java.util.List;

public class MainActivity extends ReactActivity implements OnImagePickerPermissionsCallback {
    private PermissionListener listener;
    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "Regest";
    }

    @Override
    public void setPermissionListener(@NonNull PermissionListener listener) {
      this.listener = listener;
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, String[] permissions, int[] grantResults) {
        if (listener!=null){
            listener.onRequestPermissionsResult(requestCode, permissions, grantResults);
        }
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
    }
}

