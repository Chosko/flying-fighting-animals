using System;
using UnityEngine;

namespace Settings
{
    /// <summary>
    /// Enum to save the current opened panel
    /// </summary>
    public enum GUIState
    {
        /// <summary>
        /// The Main menu panel
        /// </summary>
        MAIN_PANEL,

        /// <summary>
        /// The client menu panel
        /// </summary>
        CLIENT_PANEL,

        /// <summary>
        /// The server menu panel
        /// </summary>
        SERVER_PANEL
    }

    /// <summary>
    /// Enums the match states
    /// </summary>
    public enum MatchState
    {
        /// <summary>
        /// Waiting room state (score board displayed)
        /// </summary>
        WAITING_ROOM,

        /// <summary>
        /// Match state (the game)
        /// </summary>
        MATCH
    }

  public static class ApplicationSettings
  {
    /// <summary>
    /// The time elapsed between each client status update
    /// </summary>
    public const float CLIENT_UPDATE_TIME = 5.0f;
  
    /// <summary>
    /// Constant Server Port
    /// </summary>
    public const int DEFAULT_SERVER_PORT = 25001;
  
    /// <summary>
    /// Constant The default server IP the client connects
    /// </summary>
    public const string DEFAULT_SERVER_HOST = "localhost";

    /// <summary>
    /// Indicates wether or not the server is dedicated by default
    /// </summary>
    public const bool DEFAULT_DEDICATED_SERVER = false;
  
    /// <summary>
    /// Constant Max Allowed simultaneous players for the server.
    /// </summary>
    public const int DEFAULT_MAX_PLAYERS = 100;
  
    /// <summary>
    /// Constant the name of the server. It should be showed in the server list (in case of master server)
    /// </summary>
    public const string DEFAULT_SERVER_NAME = "Game 1";  
    
    /// <summary>
    /// The Server scene name. Loaded on serverInitialized
    /// </summary>
    /// <seealso>
    /// MainMenuGui.OnServerInitialized
    /// </seealso>
    public const string GAME_SCENE = "Game Scene";

    /// <summary>
    /// The Main Menu Scene name. Loaded on Logout.
    /// </summary>
    public const string MAIN_MENU = "MainMenu";

    /// <summary>
    /// Constant default player name
    /// </summary>
    public const string DEFAULT_PLAYER_NAME = "Player";

    /// <summary>
    /// Development Options
    /// </summary>
    public const bool IS_DEVELOPMENT = true;

    /// <summary>
    /// Constant player preference key for server host.
    /// </summary>
    public const string PLAYERPREF_HOST_KEY = "host";
    
    /// <summary>
    /// Constant player name preference key
    /// </summary>
    public const string PLAYERPREF_PLAYER_NAME_KEY = "playername";
    
    /// <summary>
    /// Constant service port preference key
    /// </summary>
    public const string PLAYERPREF_PORT_KEY = "port";
    
    /// <summary>
    /// Constant dedicated server preference key.
    /// </summary>
    public const string PLAYERPREF_DEDICATED_SERVER_KEY = "dedicated_server";
    
    /// <summary>
    /// Constant match duration preference key.
    /// </summary>
    public const string PLAYERPREF_MATCH_DURATION_KEY = "match_duration";


    public static void LoadMainMenu(){
      Application.LoadLevel (MAIN_MENU);
    }
  }
}

