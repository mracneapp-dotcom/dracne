#!/bin/bash

# Fix InAppPurchasesModule.java
cat > node_modules/expo-in-app-purchases/android/src/main/java/expo/modules/inapppurchases/InAppPurchasesModule.java << 'JAVA'
package expo.modules.inapppurchases;

import android.content.Context;
import expo.modules.kotlin.modules.Module;
import expo.modules.kotlin.modules.ModuleDefinition;

public class InAppPurchasesModule extends Module {
  private BillingManager billingManager;

  @Override
  public ModuleDefinition definition() {
    return ModuleDefinition.create()
      .name("ExpoInAppPurchases")
      .onCreate(() -> {
        billingManager = new BillingManager(getContext());
      })
      .asyncFunction("connectAsync", () -> billingManager.connect())
      .asyncFunction("getProductsAsync", (String[] skus) -> billingManager.getProducts(skus))
      .asyncFunction("getPurchaseHistoryAsync", (Boolean refresh) -> billingManager.getPurchaseHistory(refresh))
      .asyncFunction("purchaseItemAsync", (String sku) -> billingManager.purchaseItem(sku))
      .asyncFunction("finishTransactionAsync", (String purchaseToken, Boolean consume) -> 
        billingManager.finishTransaction(purchaseToken, consume))
      .onDestroy(() -> {
        if (billingManager != null) billingManager.destroy();
      });
  }

  private Context getContext() {
    return getAppContext().getReactContext();
  }
}
JAVA

# Fix InAppPurchasesPackage.java  
cat > node_modules/expo-in-app-purchases/android/src/main/java/expo/modules/inapppurchases/InAppPurchasesPackage.java << 'JAVA'
package expo.modules.inapppurchases;

import expo.modules.core.BasePackage;

public class InAppPurchasesPackage extends BasePackage {
}
JAVA

echo "✅ Patched expo-in-app-purchases"
