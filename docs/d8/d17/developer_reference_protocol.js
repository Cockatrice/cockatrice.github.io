var developer_reference_protocol =
[
    [ "Protocol (Overview)", "df/d26/developer_reference_protocol_overview.html", [
      [ "Cockatrice Server Protocol – Overview", "df/d26/developer_reference_protocol_overview.html#cockatrice-server-protocol--overview", [
        [ "Purpose", "df/d26/developer_reference_protocol_overview.html#purpose", null ],
        [ "High-Level Properties", "df/d26/developer_reference_protocol_overview.html#high-level-properties", null ],
        [ "Message Envelopes", "df/d26/developer_reference_protocol_overview.html#message-envelopes", [
          [ "Client → Server: CommandContainer", "df/d26/developer_reference_protocol_overview.html#client--server-commandcontainer", null ],
          [ "Server → Client: ServerMessage", "df/d26/developer_reference_protocol_overview.html#server--client-servermessage", null ]
        ] ],
        [ "Asynchronous Model", "df/d26/developer_reference_protocol_overview.html#asynchronous-model", null ],
        [ "Versioning", "df/d26/developer_reference_protocol_overview.html#versioning", null ]
      ] ]
    ] ],
    [ "GameCommand (Protocol Concept)", "d0/d5b/protocol_game_command.html", [
      [ "Game Commands Reference", "d0/d5b/protocol_game_command.html#game-commands-reference", [
        [ "Command Mapping", "d0/d5b/protocol_game_command.html#command-mapping", [
          [ "<span class=\"tt\">GAME_SAY</span> (1002)", "d0/d5b/protocol_game_command.html#game_say-1002", null ],
          [ "<span class=\"tt\">SHUFFLE</span> (1003)", "d0/d5b/protocol_game_command.html#shuffle-1003", null ],
          [ "<span class=\"tt\">ROLL_DIE</span> (1005)", "d0/d5b/protocol_game_command.html#roll_die-1005", null ],
          [ "<span class=\"tt\">DRAW_CARDS</span> (1006)", "d0/d5b/protocol_game_command.html#draw_cards-1006", null ],
          [ "<span class=\"tt\">UNDO_DRAW</span> (1007)", "d0/d5b/protocol_game_command.html#undo_draw-1007", null ],
          [ "<span class=\"tt\">FLIP_CARD</span> (1008)", "d0/d5b/protocol_game_command.html#flip_card-1008", null ],
          [ "<span class=\"tt\">ATTACH_CARD</span> (1009)", "d0/d5b/protocol_game_command.html#attach_card-1009", null ],
          [ "<span class=\"tt\">CREATE_TOKEN</span> (1010)", "d0/d5b/protocol_game_command.html#create_token-1010", null ],
          [ "<span class=\"tt\">CREATE_ARROW</span> (1011)", "d0/d5b/protocol_game_command.html#create_arrow-1011", null ],
          [ "<span class=\"tt\">DELETE_ARROW</span> (1012)", "d0/d5b/protocol_game_command.html#delete_arrow-1012", null ],
          [ "<span class=\"tt\">SET_CARD_ATTR</span> (1013)", "d0/d5b/protocol_game_command.html#set_card_attr-1013", null ],
          [ "<span class=\"tt\">SET_CARD_COUNTER</span> (1014)", "d0/d5b/protocol_game_command.html#set_card_counter-1014", null ],
          [ "<span class=\"tt\">INC_CARD_COUNTER</span> (1015)", "d0/d5b/protocol_game_command.html#inc_card_counter-1015", null ],
          [ "<span class=\"tt\">READY_START</span> (1016)", "d0/d5b/protocol_game_command.html#ready_start-1016", null ],
          [ "<span class=\"tt\">CONCEDE</span> (1017)", "d0/d5b/protocol_game_command.html#concede-1017", null ],
          [ "<span class=\"tt\">INC_COUNTER</span> (1018)", "d0/d5b/protocol_game_command.html#inc_counter-1018", null ],
          [ "<span class=\"tt\">CREATE_COUNTER</span> (1019)", "d0/d5b/protocol_game_command.html#create_counter-1019", null ],
          [ "<span class=\"tt\">SET_COUNTER</span> (1020)", "d0/d5b/protocol_game_command.html#set_counter-1020", null ],
          [ "<span class=\"tt\">DEL_COUNTER</span> (1021)", "d0/d5b/protocol_game_command.html#del_counter-1021", null ],
          [ "<span class=\"tt\">NEXT_TURN</span> (1022)", "d0/d5b/protocol_game_command.html#next_turn-1022", null ],
          [ "<span class=\"tt\">SET_ACTIVE_PHASE</span> (1023)", "d0/d5b/protocol_game_command.html#set_active_phase-1023", null ],
          [ "<span class=\"tt\">DUMP_ZONE</span> (1024)", "d0/d5b/protocol_game_command.html#dump_zone-1024", null ],
          [ "<span class=\"tt\">REVEAL_CARDS</span> (1026)", "d0/d5b/protocol_game_command.html#reveal_cards-1026", null ],
          [ "<span class=\"tt\">MOVE_CARD</span> (1027)", "d0/d5b/protocol_game_command.html#move_card-1027", null ],
          [ "<span class=\"tt\">SET_SIDEBOARD_PLAN</span> (1028)", "d0/d5b/protocol_game_command.html#set_sideboard_plan-1028", null ],
          [ "<span class=\"tt\">DECK_SELECT</span> (1029)", "d0/d5b/protocol_game_command.html#deck_select-1029", null ],
          [ "<span class=\"tt\">SET_SIDEBOARD_LOCK</span> (1030)", "d0/d5b/protocol_game_command.html#set_sideboard_lock-1030", null ],
          [ "<span class=\"tt\">CHANGE_ZONE_PROPERTIES</span> (1031)", "d0/d5b/protocol_game_command.html#change_zone_properties-1031", null ],
          [ "<span class=\"tt\">UNCONCEDE</span> (1032)", "d0/d5b/protocol_game_command.html#unconcede-1032", null ],
          [ "<span class=\"tt\">JUDGE</span> (1033)", "d0/d5b/protocol_game_command.html#judge-1033", null ],
          [ "<span class=\"tt\">REVERSE_TURN</span> (1034)", "d0/d5b/protocol_game_command.html#reverse_turn-1034", null ]
        ] ],
        [ "Notes", "d0/d5b/protocol_game_command.html#notes", null ]
      ] ]
    ] ],
    [ "CommandContainer (Protocol Concept)", "dd/d01/protocol_command_container.html", [
      [ "Overview", "dd/d01/protocol_command_container.html#cc_overview", null ],
      [ "Lifetime and Ownership", "dd/d01/protocol_command_container.html#cc_lifecycle", null ],
      [ "Command Identification", "dd/d01/protocol_command_container.html#cc_cmd_id", null ],
      [ "Command Context", "dd/d01/protocol_command_container.html#cc_context", null ],
      [ "Invariants", "dd/d01/protocol_command_container.html#cc_invariants", null ],
      [ "Command Domains", "dd/d01/protocol_command_container.html#cc_domains", null ],
      [ "Command Batching", "dd/d01/protocol_command_container.html#cc_batching", null ],
      [ "Dispatch", "dd/d01/protocol_command_container.html#cc_dispatch", null ],
      [ "Error Handling", "dd/d01/protocol_command_container.html#cc_errors", null ],
      [ "Related Concepts", "dd/d01/protocol_command_container.html#cc_related", null ]
    ] ],
    [ "ServerMessage (Protocol Concept)", "dc/d6c/protocol_server_message.html", null ],
    [ "Response (Protocol Concept)", "d3/d39/protocol_response.html", null ]
];