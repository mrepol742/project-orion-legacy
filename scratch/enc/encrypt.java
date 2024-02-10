
import java.security.spec.KeySpec;

import javax.crypto.Cipher;
import javax.crypto.SecretKey;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.PBEKeySpec;
import javax.crypto.spec.SecretKeySpec;

import java.nio.charset.StandardCharsets;


class encrypt {

    public static void main(String[] args) {
        System.out.println(decode(args[0], args[1], args[2]));
       // System.out.println(encode("[ { \"key\": \"dbln\", \"value\": \"%7B%22100071743848974%22%3A%22Nnnees1Z%22%7D\", \"domain\": \".facebook.com\", \"path\": \"/login/device-based/\", \"hostOnly\": false, \"creation\": \"2024-02-09T12:56:54.626Z\", \"lastAccessed\": \"2024-02-09T12:56:54.627Z\" }, { \"key\": \"sb\", \"value\": \"l6ZqZQX8N171q1M5c-dNQJxc\", \"domain\": \".facebook.com\", \"path\": \"/\", \"hostOnly\": false, \"creation\": \"2024-02-09T12:56:54.627Z\", \"lastAccessed\": \"2024-02-09T12:56:54.627Z\" }, { \"key\": \"ps_n\", \"value\": \"0\", \"domain\": \".facebook.com\", \"path\": \"/\", \"hostOnly\": false, \"creation\": \"2024-02-09T12:56:54.627Z\", \"lastAccessed\": \"2024-02-09T12:56:54.627Z\" }, { \"key\": \"ps_l\", \"value\": \"0\", \"domain\": \".facebook.com\", \"path\": \"/\", \"hostOnly\": false, \"creation\": \"2024-02-09T12:56:54.627Z\", \"lastAccessed\": \"2024-02-09T12:56:54.627Z\" }, { \"key\": \"wd\", \"value\": \"1517x703\", \"domain\": \".facebook.com\", \"path\": \"/\", \"hostOnly\": false, \"creation\": \"2024-02-09T12:56:54.627Z\", \"lastAccessed\": \"2024-02-09T12:56:54.627Z\" }, { \"key\": \"dpr\", \"value\": \"0.8999999761581421\", \"domain\": \".facebook.com\", \"path\": \"/\", \"hostOnly\": false, \"creation\": \"2024-02-09T12:56:54.627Z\", \"lastAccessed\": \"2024-02-09T12:56:54.627Z\" }, { \"key\": \"locale\", \"value\": \"en_US\", \"domain\": \".facebook.com\", \"path\": \"/\", \"hostOnly\": false, \"creation\": \"2024-02-09T12:56:54.627Z\", \"lastAccessed\": \"2024-02-09T12:56:54.627Z\" }, { \"key\": \"datr\", \"value\": \"Qo_BZXXh7lgAYMx8oVr3kUSF\", \"domain\": \".facebook.com\", \"path\": \"/\", \"hostOnly\": false, \"creation\": \"2024-02-09T12:56:54.627Z\", \"lastAccessed\": \"2024-02-09T12:56:54.627Z\" }, { \"key\": \"c_user\", \"value\": \"100071743848974\", \"domain\": \".facebook.com\", \"path\": \"/\", \"hostOnly\": false, \"creation\": \"2024-02-09T12:56:54.627Z\", \"lastAccessed\": \"2024-02-09T12:56:54.627Z\" }, { \"key\": \"xs\", \"value\": \"50%3A4oC-_u3ZDRmDPw%3A2%3A1707185962%3A-1%3A3222\", \"domain\": \".facebook.com\", \"path\": \"/\", \"hostOnly\": false, \"creation\": \"2024-02-09T12:56:54.628Z\", \"lastAccessed\": \"2024-02-09T12:56:54.628Z\" }, { \"key\": \"fr\", \"value\": \"1btmPHaTjkP8wXnzm.AWVH10dDkDgkj7VrM2EGnJbze2c.BlwZTP.sp.AAA.0.0.BlwZcr.AWV5q-CtMU0\", \"domain\": \".facebook.com\", \"path\": \"/\", \"hostOnly\": false, \"creation\": \"2024-02-09T12:56:54.628Z\", \"lastAccessed\": \"2024-02-09T12:56:54.628Z\" } ]", "this is a key", "and this is an iv key"));
    }

    public static String encode(String str, String key, String saltPhase) {
        try {
            return java.util.Base64.getEncoder().encodeToString(get(key, saltPhase, Cipher.ENCRYPT_MODE).doFinal(str.getBytes(StandardCharsets.UTF_8)));
        } catch (Exception e) {
            System.out.println("Foo didn't work: " + e.getMessage());
        }
        return null;
    }

    public static String decode(String str, String key, String saltPhase) {
        try {
            return new String(get(key, saltPhase, Cipher.DECRYPT_MODE).doFinal(java.util.Base64.getDecoder().decode(str)));
        } catch (Exception e) {
            System.out.println("Foo didn't work: " + e.getMessage());
        }
        return null;
    }

    public static Cipher get(String key, String saltPhase, int mode) throws Exception {
        byte[] iv = {0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0};
        IvParameterSpec ivspec = new IvParameterSpec(iv);
        SecretKeyFactory factory = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA256");
        KeySpec spec = new PBEKeySpec(key.toCharArray(), saltPhase.getBytes(), 65536, 256);
        SecretKey tmp = factory.generateSecret(spec);
        SecretKeySpec secretKey = new SecretKeySpec(tmp.getEncoded(), "AES");
        Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
        cipher.init(mode, secretKey, ivspec);
        return cipher;
    }
}