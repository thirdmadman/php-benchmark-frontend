export class GlobalConstants {
  public static DEFAULT_API_URL = process.env.NODE_ENV === 'development' ? process.env.DEFAULT_API_URL : '/api.php';

  public static ROUTE_MAIN = '/';

  public static ROUTE_ADMIN = '/admin';

  public static ROUTE_CONFIGS = '/configs';

  public static ROUTE_ABOUT = '/about';

  public static APP_NAME = 'PHPBenchmark';
}
